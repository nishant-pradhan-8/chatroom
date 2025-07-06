import type { Message, MessageResponse, User } from "../types/type";
import { format } from "date-fns";

export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) {
    return "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Must be a valid email";
  }
  return undefined;
};

export const validateUsername = (username: string): string | undefined => {
  if (!username.trim()) {
    return "Username is required";
  }
  if (username.length < 5 || username.length > 15) {
    return "Username should be greater than 5 and less than 15";
  }
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password.trim()) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return undefined;
};

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
