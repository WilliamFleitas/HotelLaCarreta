import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./adminSlice";

export const store = configureStore({
  reducer: {
    // Aqui iran las porciones del reducer.
    admin: adminSlice,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
