import { createSlice } from "@reduxjs/toolkit";

export interface ProfileI {
  email: string;
  name: string;
}

export interface ExampleStateI {
  users: ProfileI[];
}

const initialState: ExampleStateI = {
  users: [],
};

type ProfileInfoPayload = {
  payload: ProfileI;
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    saveProfileInfo: (state: ExampleStateI, { payload }: ProfileInfoPayload) => {
      state.users = [...state.users, payload];
    },
    deleteProfileInfo: (state: ExampleStateI) => {
      state.users = [];
    }
  },
});

export const { saveProfileInfo, deleteProfileInfo } = exampleSlice.actions;

export default exampleSlice.reducer;
