import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Message } from "../../../types/types";

interface MessageItemProps {
  message: Message;
  showAvatar: boolean;
  index: number;
}

const MessageItem = ({ message, showAvatar, index }: MessageItemProps) => {
  const { users } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);
  const recipientUser = users[0] ?? null;
  const isMessageFromLoggedUser = user?._id === message.from;

  useEffect(() => {
    const msg = document.getElementById("messages");
    msg!.scrollTop = msg!.scrollHeight;
  }, []);

  return (
    <div
      className={`w-full flex px-3 md:px-6 my-1 ${index === 0 && "mt-auto"} ${
        isMessageFromLoggedUser && "justify-end"
      }`}
    >
      {showAvatar && (
        <img
          src={
            isMessageFromLoggedUser
              ? `${process.env.REACT_APP_API_URL}${user?.avatar}`
              : `${process.env.REACT_APP_API_URL}${recipientUser?.avatar}`
          }
          alt={recipientUser?.name}
          className={`hidden md:block w-9 h-9 ${
            isMessageFromLoggedUser ? "order-2 ml-2" : "order-1 mr-2"
          }`}
        />
      )}
      <div
        className={` max-w-3/4 md:max-w-1/2 rounded-full py-3 px-7 poppins-14 ${
          isMessageFromLoggedUser
            ? "bg-primary-light order-1"
            : "bg-white order-2"
        } ${!showAvatar && isMessageFromLoggedUser && "md:mr-9"} ${
          !showAvatar && !isMessageFromLoggedUser && "md:ml-9"
        } `}
      >
        <p className="font-poppins text-14">{message.content}</p>
      </div>
    </div>
  );
};

export default MessageItem;
