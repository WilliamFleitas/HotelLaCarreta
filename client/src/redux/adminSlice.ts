import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AdminState {
  current: string;
}

const initialState: AdminState = {
  current: "habitaciones",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    updateData: (state: AdminState, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
  },
});

export default adminSlice.reducer;
export const { updateData } = adminSlice.actions;
