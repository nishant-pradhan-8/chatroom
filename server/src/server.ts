import dotenv from "dotenv";
dotenv.config();

import server from "./app";
import { connectDB } from "./config/db";

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
