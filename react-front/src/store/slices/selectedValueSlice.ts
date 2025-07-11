import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SelectedValueState = string | null;

const initialState: SelectedValueState = null as SelectedValueState;

export const selectedValueSlice = createSlice({
  name: "selectedValue",
  initialState,
  reducers: {
    setSelectedValue: (state, action: PayloadAction<SelectedValueState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setSelectedValue } = selectedValueSlice.actions;
export default selectedValueSlice.reducer;
