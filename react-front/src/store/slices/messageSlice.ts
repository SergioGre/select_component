import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<string>) {
      state = action.payload;
      return state;
    },
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
