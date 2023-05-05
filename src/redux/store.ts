import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import { hiLoggerMiddleware } from "./middleware/hiLoggerMiddleware";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hiLoggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
