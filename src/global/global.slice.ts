import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getFilesFromFS } from "../files/get-files";

type ViewType = "videos" | "subtitles" | "subtitle-editor";

export interface VideoState {
  viewType: ViewType;
}

const initialState: VideoState = {
  viewType: "videos",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // setCurrentVideoIndex: (state, action: PayloadAction<number>) => {
    //   const nextIndex = action.payload;
    //   if (nextIndex <= state.files.length - 1) {
    //     state.currentVideoIndex = nextIndex;
    //   } else {
    //     delete state.currentVideoIndex;
    //   }
    // },
  },
});

export default globalSlice.reducer;
