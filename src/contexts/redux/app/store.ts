import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../features/items/ItemSlice";

const store = configureStore({
  reducer: {
    item: itemReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
