import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "review",
  initialState: {
    comments: [
      {
        id: "d1",
        rating: "5",
        commentText: "It tastes better when it's freezning cold.",
      },
    ],
  },
  reducers: {
    replaceComments(state, action) {
      state.comments = action.payload.comments;
    },
  },
});

export const commentActions = commentSlice.actions;

export default commentSlice;
