import UserAvatar from "../../../components/Avatar";
import type { Message, User } from "../../../types/type";
import { useAppContext } from "../../../store/store";
import { formatDateTime } from "../../../utils/utils";
interface MessageProps {
  message: Message;
}
export default function Message({ message }: MessageProps) {
  const { user, userList } = useAppContext();
  let sender: User | null =
    userList?.find((u) => u._id === message.senderId) ||
    (user?._id === message.senderId ? user : null);

  return (
    <div
      className={`flex  gap-4 ${message.senderId === user?._id ? "flex-row-reverse" : "flex-row"}`}
    >
      <div>
        <UserAvatar
          username={message.senderUsername}
          online={sender?.online || false}
        />
      </div>

      <div>
        <div className="flex flex-row items-center gap-2">
          <h1 className="font-bold">{message.senderUsername}</h1>
          <p className="text-[0.8rem] text-gray-500 ">
            {formatDateTime(message.createdAt)}
          </p>
        </div>

        <p className="max-w-[30rem]">{message.message}</p>
      </div>
    </div>
  );
}
