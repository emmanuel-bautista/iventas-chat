import React, { useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import OptionsIcon from "mdi-react/DotsVerticalIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  getMessagesWith,
  sendMessage,
  showUserInfo,
} from "../chatSlice";
import { RootState } from "../../../app/store";
import SendButton from "./SendButton";

const Messages = () => {
  const dispatch = useDispatch();
  const { users, messages, socket, isUserInfoVisible } = useSelector(
    (state: RootState) => state.chat
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const recipientUser = users[0] ?? null;
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (recipientUser) {
      dispatch(getMessagesWith(recipientUser?._id));

      socket?.on("PRIVATE_MESSAGE", (message: any) => {
        dispatch(
          addMessage({
            content: message.content,
            from: message.from,
            to: message.to,
          })
        );
      });
    }
  }, [dispatch, recipientUser, socket]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message && message?.trim() !== "") {
      dispatch(
        sendMessage({
          content: message,
          to: recipientUser?._id,
          from: user?._id!,
        })
      );
      setMessage("");
    }
  };

  const showMessageImage = (currentIndex: number) => {
    if (currentIndex > 0) {
      if (messages[currentIndex].from === recipientUser?._id) {
        if (messages[currentIndex - 1].from === recipientUser?._id) {
          return false;
        } else {
          return true;
        }
      } else {
        if (messages[currentIndex - 1].from === user?._id) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  };

  return (
    <div className="w-full fixed top-0 max-h-full h-screen bg-light overflow-hidden flex flex-col">
      {isUserInfoVisible && (
        <div
          className="absolute w-full h-full"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1,
            top: "0",
          }}
        ></div>
      )}
      <nav className="h-16 fixed top-0 md:relative w-full py-1 px-6 bg-primary flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={`${process.env.REACT_APP_API_URL}${recipientUser?.avatar}`}
            alt={recipientUser?.name}
            width={52}
            height={52}
          />
          <p className="font-poppins text-18 font-bold text-white ml-5">
            {recipientUser?.name}
          </p>
        </div>
        <button
          className="md:hidden"
          onClick={() => {
            dispatch(showUserInfo(true));
          }}
        >
          <OptionsIcon color="white" />
        </button>
      </nav>
      <div
        id="messages"
        className="w-full h-full overflow-y-auto py-1 mt-16 mb-20 md:mt-0 md:mb-0 flex flex-col flex-nowrap"
      >
        {messages.map((msg, index) => (
          <MessageItem
            key={index}
            message={msg}
            index={index}
            showAvatar={showMessageImage(index)}
          />
        ))}
      </div>
      <div className="fixed bottom-0 bg-light border p-3  w-full md:relative h-20">
        <form className="w-full flex items-center" onSubmit={onSubmit}>
          <input
            type="text"
            className="bg-white py-2 px-5 w-full rounded-full mr-3 focus:outline-none"
            placeholder="Escribe un mensaje"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <SendButton />
        </form>
      </div>
    </div>
  );
};

export default Messages;
