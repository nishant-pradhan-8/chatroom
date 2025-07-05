import Message from "../models/Message";
import { Request, Response } from "express";
export interface MessageObject {
  senderId: string;
  content: string;
}
export const saveMessage = async (msgObj: MessageObject) => {
  const msg = await Message.create(msgObj);
  return msg;
};
export default async function getAllMessages(req: Request, res: Response) {
  try {
    const { page } = req.query;
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * 20)
      .limit(20);

    res.status(200).json({
      status: "success",
      message: "Messages fetched successfully",
      data: messages,
    });
    return;
  } catch (e: unknown) {
    res.status(500).json({
      status: "error",
      message: "Internal Server error",
      data: null,
    });
  }
}

export async function getMessagesCount(req: Request, res: Response) {
  try {
    const messageCount = await Message.countDocuments({});
    res.status(200).json({
      status: "success",
      message: "Messages fetched successfully",
      data: messageCount,
    });
    return;
  } catch (e: unknown) {
    res.status(500).json({
      status: "error",
      message: "Internal Server error",
      data: null,
    });
  }
}
