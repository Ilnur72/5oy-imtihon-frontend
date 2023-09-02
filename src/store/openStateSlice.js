import { createSlice } from "@reduxjs/toolkit";

const openStateSlice = createSlice({
  name: "openStateSlice",
  initialState: { isOpen: false },

  reducers: {
    openState: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openState } = openStateSlice.actions;
export default openStateSlice.reducer;
