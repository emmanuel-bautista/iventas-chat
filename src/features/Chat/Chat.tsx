import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { connectToSocket, showUserInfo } from "./chatSlice";
import ChatList from "./components/ChatList";
import Messages from "./components/Messages";
import UserInfo from "./components/UserInfo";

const Chat = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      if (window.innerWidth >= 768) {
        dispatch(showUserInfo(false));
      }
    });
    dispatch(connectToSocket());
  }, [dispatch]);

  return (
    <div className="flex max-w-full w-full overflow-y-hidden  ">
      <ChatList />
      <Messages />
      <UserInfo />
    </div>
  );
};

export default Chat;
