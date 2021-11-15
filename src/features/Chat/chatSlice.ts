import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { setToken } from "../../config/axios";
import { io } from "socket.io-client";
import { Message, User } from "../../types/types";

export interface ChatState {
  socket?: any;
  chats: [];
  users: User[];
  loading: boolean;
  messages: Message[];
  isUserInfoVisible: boolean;
}

const initialState: ChatState = {
  chats: [],
  users: [],
  loading: false,
  messages: [],
  isUserInfoVisible: false,
};

export const getUsers = createAsyncThunk(
  "getUsers",
  async (arg = undefined, thunkAPI) => {
    try {
      setToken(localStorage.getItem("token") ?? "");
      const { data } = await axios.get("/api/users");
      return data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const getMessagesWith = createAsyncThunk(
  "getMessages",
  async (userId: string, thunkAPI) => {
    try {
      // setToken(localStorage.getItem("token") ?? "");
      const { data } = await axios.get(`/api/messages/${userId}`);
      return data.messages;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    connectToSocket: (state) => {
      try {
        state.socket = io(`${process.env.REACT_APP_API_URL}`, {
          extraHeaders: {
            "x-access-token": localStorage.getItem("token") ?? "",
          },
        });
      } catch (error) {}
    },
    sendMessage: (state, { payload }: PayloadAction<Message>) => {
      state.socket?.emit("SEND_MESSAGE", payload);
      state.messages = [...state.messages, payload];
    },
    addMessage: (state, { payload }: PayloadAction<Message>) => {
      state.messages = [...state.messages, payload];
    },
    showUserInfo: (state, { payload }: PayloadAction<boolean>) => {
      state.isUserInfoVisible = payload;
    },
  },
  extraReducers: (builder) => {
    // get users
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getUsers.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.users = payload;
      }
    );
    builder.addCase(getUsers.rejected, (state) => {
      state.loading = false;
    });
    // get messages
    builder.addCase(getMessagesWith.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getMessagesWith.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.messages = payload;
      }
    );
    builder.addCase(getMessagesWith.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { connectToSocket, sendMessage, addMessage, showUserInfo } =
  chatSlice.actions;
export default chatSlice.reducer;
