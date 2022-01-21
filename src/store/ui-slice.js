import { createSlice } from "@reduxjs/toolkit";

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  return storedToken;
};

const retrieveLocalId = () => {
  const storedLocalId = localStorage.getItem("localId");
  return storedLocalId;
};

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    token: retrieveStoredToken() ? retrieveStoredToken() : null,
    localId: retrieveLocalId() ? retrieveLocalId() : null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
    dataStatus: {
      status: "pending",
      title: "Sending...",
      message: "Data processing...",
    },
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.idToken;
      state.localId = action.payload.localId;
      state.isLoggedIn = true;

      localStorage.setItem("token", action.payload.idToken);
      localStorage.setItem("localId", action.payload.localId);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
    showDataStatus(state, action) {
      state.dataStatus = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    resetDataStatus(state) {
      state.dataStatus = {
        status: "pending",
        title: "Sending...",
        message: "Data processing...",
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
