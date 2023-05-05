import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import hiLoggerEnhancer from "./enhancers/hiLoggerEnhancer";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  // @ts-ignore
  // enhancers: [hiLoggerEnhancer],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
