export interface User {
  _id: string;
  username: string;
  email?: string;
  online: boolean;
}

export interface Credentials {
  username?: string;
  email: string;
  password: string;
}

export interface Message {
  messageId: string;
  senderId: string;
  senderUsername: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageResponse {
  _id: string;
  senderId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
