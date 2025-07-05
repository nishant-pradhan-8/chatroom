import type { Message, MessageResponse, User } from "../types/type";
import { format } from "date-fns";

export const formatMessageResponse = (
  messages: MessageResponse[],
  userList: User[],
  user: User
): Message[] => {
  const formatedMessageList: Message[] = messages.map(
    (msg: MessageResponse) => {
      const sender = userList?.find((u) => u._id === msg.senderId);

      let senderUsername: string;
      if (sender) {
        senderUsername = sender.username;
      } else if (user._id === msg.senderId) {
        senderUsername = user.username;
      } else {
        senderUsername = "Deleted User";
      }

      return {
        messageId: msg._id,
        senderId: msg.senderId,
        senderUsername,
        message: msg.content,
        createdAt: msg.createdAt,
        updatedAt: msg.createdAt,
      };
    }
  );
  return formatedMessageList;
};

export const formatDateTime = (dateTime: string) => {
  const formatted = format(new Date(dateTime), "MMM d, hh:mm a");

  return formatted;
};
