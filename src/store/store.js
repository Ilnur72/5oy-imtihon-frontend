import { configureStore } from "@reduxjs/toolkit";

import openStateSlice from "./openStateSlice.js";
import jwtTokenSlice from "./jwtTokenSlice.js";

export const store = configureStore({
  reducer: {
    openState: openStateSlice,
    openStateGuide: openStateSlice,
    jwtToken: jwtTokenSlice,
  },
});
