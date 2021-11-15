import React, { useEffect } from "react";
import chatIcon from "../../../assets/chat.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { getUsers } from "../chatSlice";

const ChatList = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { socket } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="md:w-2/4 lg:w-1/3 h-screen max-h-full flex-col items-center py-5 hidden md:flex">
      <img
        src={`${process.env.REACT_APP_API_URL}${user?.avatar}`}
        alt={user?.name}
        className="mt-3"
        width={105}
        height={105}
      />
      <p className="font-poppins text-18 font-bold text-black ">{user?.name}</p>
      <p className="poppins-16">{user?.phone}</p>
      <button
        onClick={() => {
          socket.disconnect();
          localStorage.removeItem("token");
          window.location.reload();
        }}
        className="font-poppins text-14 font-bold text-primary underline mt-2"
      >
        Cerrar sesión
      </button>
      <div className="bg-blue-light p-5 w-full mt-16 flex">
        <img
          src={chatIcon}
          alt="chat"
          width={20}
          height={20}
          className="mx-3"
        />
        <p className="poppins-14 font-bold">Chat</p>
      </div>
    </div>
  );
};

export default ChatList;
