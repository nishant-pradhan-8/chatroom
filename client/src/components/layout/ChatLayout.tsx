import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useAppContext } from "../../store/store";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";
import { getProfile, getUsers } from "../../service/userService";
import { useEffect } from "react";
import type { Message, MessageResponse, User } from "../../types/type";
import { getMessageCount, getMessageList } from "../../service/messageService";
import { formatMessageResponse } from "../../utils/utils";

export default function ClippedLayout() {
  const {
    user,
    setUser,
    userList,
    setUserList,
    messageList,
    setMessageList,
    page,
    setPage,
    appendMessage,
    messageCount,
    setMessageCount,
  } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }

    socket.connect();

    socket.emit("new-user-online", user?._id);

    const handleNewUserOnline = (user: { userId: string }) => {
      if (!userList) {
        return;
      }
      console.log("went");

      const updatedUserList: User[] = userList.map((u) => {
        if (u._id === user.userId) {
          return { ...u, online: true };
        }
        return u;
      });
      setUserList(updatedUserList);
    };

    const handleUserOffline = (user: { userId: string }) => {
      if (!userList) {
        return;
      }

      const updatedUserList: User[] = userList.map((u) => {
        if (u._id === user.userId) {
          return { ...u, online: false };
        }
        return u;
      });
      setUserList(updatedUserList);
    };
    const handleNewMessage = (response: { message: MessageResponse }) => {
      if (!userList || !user) {
        return;
      }

      setMessageCount((prev: number) => prev + 1);
      console.log("went");
      const formattedMessage: Message = formatMessageResponse(
        [response.message],
        userList,
        user
      )[0];
      appendMessage(formattedMessage);
    };

    socket.on("notify-user-online", handleNewUserOnline);
    socket.on("notify-user-offline", handleUserOffline);
    socket.on("new-message-incomming", handleNewMessage);
    return () => {
      socket.off("notify-user-online", handleNewUserOnline);
      socket.off("notify-user-offline", handleUserOffline);
      socket.off("new-message-incomming", handleNewMessage);

      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (!user) {
      async function fetchLoggedInUser() {
        const res = await getProfile();
        if (res.data) {
          setUser({ ...res.data, online: true });
        } else {
          navigate("/login");
        }
      }
      fetchLoggedInUser();
    }
    if (!userList) {
      async function fetchUserList() {
        const res = await getUsers();
        if (res.data) {
          setUserList(res.data);
        }
      }
      fetchUserList();
    }
    if (!messageCount) {
      async function fetchUserList() {
        const res = await getMessageCount();
        if (res.data) {
          setMessageCount(res.data);
        }
      }
      fetchUserList();
    }
  }, []);

  useEffect(() => {
    if (user && !messageList) {
      async function getMessages() {
        if (!userList || !user) {
          return;
        }
        const res = await getMessageList(page);
        if (res.data) {
          setPage((prev: number) => prev + 1);
          const formatedMessageList: Message[] = formatMessageResponse(
            res.data,
            userList,
            user
          );
          console.log(formatedMessageList);
          setMessageList(formatedMessageList.reverse());
        }
      }
      getMessages();
    }
  }, [userList]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <MainContent />
    </Box>
  );
}
