import { UserI, LoginResI } from "_interfaces/auth-api.interfaces";
import { createSlice } from "@reduxjs/toolkit";

export interface ProfileI {
  id: string;
  email: string;
  name: string;
  qatarID: string;
  createdAt?: Date;
  verifiedAt?: Date;
  updatedAt?: Date;
}

export interface AuthStateI {
  loading: boolean;
  accessToken?: string;
  user?: UserI;
  error?: string;
  success: boolean;
}

const initialState: AuthStateI = {
  loading: false,
  accessToken: undefined,
  user: undefined,
  error: undefined,
  success: false,
};

type LoginInfoPayload = {
  payload: LoginResI;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveTokenAuth: (state: AuthStateI, { payload }: LoginInfoPayload) => {
      state.accessToken = payload.token;
      state.user = payload.user;
    },
    deleteTokenAuth: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

export const { saveTokenAuth, deleteTokenAuth } = authSlice.actions;

export default authSlice.reducer;
