import { Auth, User } from "../../types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { setToken } from "../../config/axios";

export interface AuthState {
  user: User | undefined;
  loading: boolean;
  error?: string | undefined;
  authenticated: boolean;
  authenticating?: boolean | undefined;
}

export const login = createAsyncThunk(
  "auth/login",
  async (auth: Auth, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/login", {
        email: auth.email,
        password: auth.password,
      });

      localStorage.setItem("token", data.token);
      setToken(data.token);
      return data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const isAuthenticated = createAsyncThunk(
  "auth",
  async (arg = undefined, thunkAPI) => {
    try {
      const token = localStorage.getItem("token") ?? "";
      setToken(token);
      const { data } = await axios.get("/api/auth");

      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

const initialState: AuthState = {
  user: undefined,
  loading: false,
  authenticated: false,
  authenticating: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      // state.authenticating = false;
      // state.authenticated = false;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      login.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.user = payload;
        state.authenticated = true;
      }
    );
    builder.addCase(
      login.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.error = "Correo y/o contraseña incorrectos";
        state.authenticated = false;
      }
    );
    // authenticate
    builder.addCase(isAuthenticated.pending, (state) => {
      state.loading = true;
      state.authenticating = true;
    });
    builder.addCase(
      isAuthenticated.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.user = payload;
        state.authenticated = true;
        state.authenticating = false;
      }
    );
    builder.addCase(
      isAuthenticated.rejected,
      (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.error = "";
        state.authenticated = false;
        state.authenticating = false;
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
