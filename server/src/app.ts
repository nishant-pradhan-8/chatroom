import express, { Request, Response } from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { CorsOptions } from "cors";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/UserRoutes";
import messageRoutes from "./routes/MessageRoutes";
import { VerifyToken } from "./middleware/VerifyToken";
import onlineUsers from "./OnlineUsers";
import { MessageObject, saveMessage } from "./controllers/MessageController";
import { rateLimit } from 'express-rate-limit'
const app = express();

const chatLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 30, 
  message: {
    status: 429,
    message: "Too many requests. Please wait a moment before sending more messages.",
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});


const server = createServer(app);

const corsOptions: CorsOptions = {
  origin: process.env.ORIGIN,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};

const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


io.on("connection", (socket) => {

  socket.on("new-user-online", (userId:string) => {

    onlineUsers.set(userId, socket.id);
    socket.broadcast.emit("notify-user-online", { userId });
  });

  socket.on("new-user-registration",()=>{
    socket.broadcast.emit('new-user-registration')
  })

  socket.on("new-message", async (msgObj: MessageObject) => {
    const message = await saveMessage(msgObj);
    socket.emit("new-message-incomming", { message });
    socket.broadcast.emit("new-message-incomming", { message });
  });

  socket.on("disconnect", () => {
    
    const userId = [...onlineUsers.entries()].find(
      ([id, sId]) => sId === socket.id
    )?.[0];
    if (userId) {
      onlineUsers.delete(userId);
      console.log(onlineUsers)
      socket.broadcast.emit("notify-user-offline", { userId });
    }
  });
});

app.use(chatLimiter)

app.use("/api/auth", authRoutes);

app.use(VerifyToken);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

export default server;
