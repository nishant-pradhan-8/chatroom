import express from "express";
import getAllMessages from "../controllers/MessageController";
import { getMessagesCount } from "../controllers/MessageController";
const router = express.Router();
router.get("/", getAllMessages);
router.get("/count", getMessagesCount);
export default router;
