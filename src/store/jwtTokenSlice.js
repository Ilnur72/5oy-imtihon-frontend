import { createSlice } from "@reduxjs/toolkit";

const jwtTokenSlice = createSlice({
  name: "jwtTokenSlice",
  initialState: {},

  reducers: {
    jwtToken: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { jwtToken } = jwtTokenSlice.actions;
export default jwtTokenSlice.reducer;
