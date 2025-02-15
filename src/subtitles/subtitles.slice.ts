import path from "node:path";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getFilesFromFS } from "../files/get-files";

export interface SubtitlesState {
  files: string[];
  currentSubtitleIndex?: number;
}

const initialState: SubtitlesState = {
  files: [],
};

export const subtitlesSlice = createSlice({
  name: "subtitles",
  initialState,
  reducers: {
    setCurrentSubtitleIndex: (state, action: PayloadAction<number>) => {
      const nextIndex = action.payload;
      if (nextIndex <= state.files.length - 1) {
        state.currentSubtitleIndex = nextIndex;
      } else {
        delete state.currentSubtitleIndex;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getMatchingSubtitlesFilesFromFS.fulfilled,
      (state, action) => {
        state.files = action.payload;
        if (state.files.length > 0) {
          state.currentSubtitleIndex = 0;
        }
      }
    );
  },
});

const SUBTITLE_EXTENSIONS = [
  "srt", // SubRip
  "ass",
];

export const getMatchingSubtitlesFilesFromFS = createAsyncThunk(
  "subtitles/readFiles",
  detectSubtitleFilesFor
);

function detectSubtitleFilesFor(videoFilePath: string) {
  return getFilesFromFS({
    root: path.dirname(videoFilePath),
    extensions: SUBTITLE_EXTENSIONS,
    constraintBasename: path.basename(videoFilePath),
  });
}

export const { setCurrentSubtitleIndex } = subtitlesSlice.actions;

export default subtitlesSlice.reducer;
