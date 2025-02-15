import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getFilesFromFS } from "../files/get-files";

export interface VideoState {
  files: string[];
  currentVideoIndex?: number;
}

const initialState: VideoState = {
  files: [],
};

export const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setCurrentVideoIndex: (state, action: PayloadAction<number>) => {
      const nextIndex = action.payload;

      if (nextIndex <= state.files.length - 1) {
        state.currentVideoIndex = nextIndex;
      } else {
        delete state.currentVideoIndex;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVideoFilesFromFS.fulfilled, (state, action) => {
      state.files = action.payload;
      if (state.files.length > 0) {
        state.currentVideoIndex = 0;
      }
    });
  },
});

function detectVideoFiles() {
  return getFilesFromFS({
    root: process.cwd(),
    extensions: VIDEO_EXTENSIONS,
    recursive: true,
  });
}

const VIDEO_EXTENSIONS = [
  "mp4", // MPEG-4 Part 14
  "mkv", // Matroska
  "avi", // Audio Video Interleave
  "mov", // QuickTime File Format
  "flv", // Flash Video
  "wmv",
  "webm",
  "m4v",
  "mpg",
  "mpeg",
  "3gp",
  "3g2",
];

export const getVideoFilesFromFS = createAsyncThunk(
  "videos/readFiles",
  detectVideoFiles
);

// Action creators are generated for each case reducer function
export const { setCurrentVideoIndex } = videosSlice.actions;

export default videosSlice.reducer;
