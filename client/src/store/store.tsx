import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { Message, User } from "../types/type";
type AppContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userList: User[] | null;
  setUserList: React.Dispatch<React.SetStateAction<User[] | null>>;
  messageList: Message[] | null;
  setMessageList: React.Dispatch<React.SetStateAction<Message[] | null>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  shouldScrollToBottom: boolean;
  setShouldScrollToBottom: React.Dispatch<React.SetStateAction<boolean>>;
  appendMessage: (newMessage: Message) => void;
  messageCount: number;
  setMessageCount: React.Dispatch<React.SetStateAction<number>>;
  newRegistration:boolean;
   setNewRegistration: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);
export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userList, setUserList] = useState<User[] | null>(null);
  const [messageList, setMessageList] = useState<Message[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const [messageCount, setMessageCount] = useState<number>(0);
  const [newRegistration, setNewRegistration] = useState<boolean>(false)
  const appendMessage = (newMessage: Message) => {
    setMessageList((prev) => [...(prev || []), newMessage]);
    setShouldScrollToBottom(true);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        messageList,
        setMessageList,
        userList,
        setUserList,
        page,
        setPage,
        shouldScrollToBottom,
        setShouldScrollToBottom,
        appendMessage,
        messageCount,
        setMessageCount,
        newRegistration, 
        setNewRegistration
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
};
