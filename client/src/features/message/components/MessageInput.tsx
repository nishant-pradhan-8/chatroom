import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import socket from "../../../socket";
import { useAppContext } from "../../../store/store";
interface MessageObject {
  senderId: string;
  content: string;
}
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { user } = useAppContext();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    const messageObj: MessageObject = {
      senderId: user._id,
      content: message.trim(),
    };
    socket.emit("new-message", messageObj);
    setMessage("");
  };

  return (
    <div>
      <form
        onSubmit={handleSend}
        className="flex  items-center border-1 border-purple-600  rounded-xl px-3 py-2 w-full shadow-md"
      >
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-black placeholder-gray-400 px-2"
          placeholder="Type a message..."
          value={message}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={message.split("").length === 0}
          className=" p-2 flex items-center justify-between disabled:bg-gray-400 bg-purple-600 cursor-pointer hover:bg-purple-700 text-white rounded-full  transition"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
