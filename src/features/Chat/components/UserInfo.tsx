import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import ChevronUpIcon from "mdi-react/ChevronUpIcon";
import CloseIcon from "mdi-react/CloseIcon";
import { showUserInfo } from "../chatSlice";

const UserInfo = () => {
  const { users, isUserInfoVisible, socket } = useSelector(
    (state: RootState) => state.chat
  );
  const recipientUser = users[0] ?? null;
  const dispatch = useDispatch();

  return (
    <div
      style={{
        zIndex: 2,
      }}
      className={`${
        isUserInfoVisible
          ? "fixed flex top-32 rounded-t-3xl animate-userinfo"
          : "hidden"
      }  bg-white w-screen md:w-2/4 lg:w-1/3 h-full max-h-screen md:flex flex-col items-center font-poppins overflow-y-hidden md:overflow-y-scroll overflow-x-hidden`}
    >
      <img
        src={`${process.env.REACT_APP_API_URL}${recipientUser?.avatar}`}
        alt={recipientUser?.name}
        className={`${
          isUserInfoVisible ? "fixed top-16" : "mt-2"
        } animate-img-user`}
        style={{
          zIndex: 55,
        }}
        width={140}
        height={140}
      />
      <button
        className="self-end mt-3 md:hidden mr-3"
        onClick={() => {
          dispatch(showUserInfo(false));
        }}
      >
        <CloseIcon />
      </button>
      <p className="mt-16 md:mt-2 text-18 font-bold">{recipientUser?.name}</p>
      <p className="text-16">{recipientUser?.phone}</p>
      <button
        onClick={() => {
          socket.disconnect();
          localStorage.removeItem("token");
          window.location.reload();
        }}
        className="font-poppins text-14 font-bold text-primary underline mt-2 md:hidden"
      >
        Cerrar sesión
      </button>
      <div className="bg-blue-light px-5 py-3 w-full mt-10 flex items-center justify-between">
        <p className="text-14 font-semibold">Datos del contacto </p>
        <ChevronUpIcon />
      </div>
      <div
        className="w-full mt-5 px-5 py-4 overflow-y-scroll mb-10"
        style={{
          minHeight: "24rem",
          height: "24rem",
          maxHeight: "24rem",
        }}
      >
        <div>
          <small className="text-gray-100 text-12 font-medium">Edad</small>
          <p className="text-14 font-semibold">{recipientUser?.age}</p>
        </div>
        <div>
          <small className="text-gray-100 text-12 font-medium">Correo</small>
          <p className="text-14 font-semibold">{recipientUser?.email}</p>
        </div>
        <div>
          <small className="text-gray-100 text-12 font-medium">Prioridad</small>
          <p className="text-14 font-semibold">{recipientUser?.priority}</p>
        </div>
        <div>
          <small className="text-gray-100 text-12 font-medium">Problemas</small>
          <p className="text-14 font-semibold">{recipientUser?.problem}</p>
        </div>
        <div>
          <small className="text-gray-100 text-12 font-medium">Promoción</small>
          <p className="text-14 font-semibold">{recipientUser?.promotion}</p>
        </div>
        <div>
          <small className="text-gray-100 text-12 font-medium">CURP</small>
          <p className="text-14 font-semibold">{recipientUser?.curp}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
