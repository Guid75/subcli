import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import videosReducer from "./videos/videos.slice.ts";
import subtitlesReducer from "./subtitles/subtitles.slice.ts";
import globalReducer from "./global/global.slice.ts";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    videos: videosReducer,
    subtitles: subtitlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
