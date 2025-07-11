import { configureStore } from "@reduxjs/toolkit";
import selectedValueReducer from "./slices/selectedValueSlice";
import messageSliceReducer from "./slices/messageSlice";

export const store = configureStore({
  reducer: {
    selectedValue: selectedValueReducer,
    messageSlice: messageSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
