import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./commnet-slice";
import drinkSlice from "./drink-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    drink: drinkSlice.reducer,
    comment: commentSlice.reducer,
  },
});

export default store;
