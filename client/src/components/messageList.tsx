import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../store/store";
import { getMessageList } from "../service/messageService";
import type { Message as MessageType } from "../types/type";
import { formatMessageResponse } from "../utils/utils";
import Message from "../features/message/components/Message";

export default function MessageList() {
  const {
    messageList,
    page,
    setPage,
    user,
    userList,
    setMessageList,
    shouldScrollToBottom,
    setShouldScrollToBottom,
  } = useAppContext();

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [requesting, setRequesting] = useState<boolean>(false);
  const [allMessagesRetrieved, setAllMessagesRetrieved] =
    useState<boolean>(false);

  const prevScrollHeightRef = useRef<number>(0);
  const prevScrollTopRef = useRef<number>(0);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = async () => {
      if (
        container.scrollTop === 0 &&
        user &&
        userList &&
        !requesting &&
        !allMessagesRetrieved
      ) {
        setRequesting(true);

        try {
          const res = await getMessageList(page);
          if (res.data.length === 0) {
            setAllMessagesRetrieved(true);
            return;
          }

          const formattedMessages: MessageType[] = formatMessageResponse(
            res.data,
            userList,
            user
          );

          prevScrollHeightRef.current = container.scrollHeight;
          prevScrollTopRef.current = container.scrollTop;

          setMessageList((prev) => [
            ...formattedMessages.reverse(),
            ...(prev || []),
          ]);
          setShouldScrollToBottom(false);
          setPage((prev) => prev + 1);
        } catch (err) {
          console.error("Failed to fetch messages", err);
        } finally {
          setRequesting(false);
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [user, userList, requesting, allMessagesRetrieved, page]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    if (page === 1) {
      container.scrollTop = container.scrollHeight;
    } else {
      const newScrollHeight = container.scrollHeight;
      container.scrollTop =
        newScrollHeight -
        prevScrollHeightRef.current +
        prevScrollTopRef.current;
    }
  }, [page]);

  useEffect(() => {
    if (!shouldScrollToBottom) return;
    const container = chatContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
    setShouldScrollToBottom(false);
  }, [messageList, shouldScrollToBottom]);

  if (!user) return null;

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col h-full overflow-x-hidden overflow-y-auto gap-4"
    >
      {messageList?.map((msg) => (
        <div key={msg.messageId}>
          <Message message={msg} />
        </div>
      ))}
    </div>
  );
}
