import { createSlice } from "@reduxjs/toolkit";

export interface GlobalComponentState {
  title?: string;
  hasBackButton: boolean;
  showSideBar?: boolean;
}

const initialState: GlobalComponentState = {
  hasBackButton: false,
  showSideBar: true,
};

type SetGlobalComponentPayload = {
  payload: GlobalComponentState;
};

const globalComponentSlice = createSlice({
  name: "globalComponent",
  initialState,
  reducers: {
    setGlobalComponent: (
      state: GlobalComponentState,
      { payload }: SetGlobalComponentPayload,
    ) => {
      state.hasBackButton = payload.hasBackButton;
      state.title = payload.title;
    },
    toggleSideBar: (state: GlobalComponentState) => {
      state.showSideBar = !state.showSideBar;
    },
  },
});

export const { setGlobalComponent, toggleSideBar } =
  globalComponentSlice.actions;

export default globalComponentSlice.reducer;

