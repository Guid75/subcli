import { Box, Text, useInput, type Key } from "ink";
import { useEffect } from "react";
import { FileSelector } from "../files/FileSelector";
import { useAppDispatch, type RootState } from "../store";
import { useSelector } from "react-redux";
import { getVideoFilesFromFS, setCurrentVideoIndex } from "./videos.slice";
import { getMatchingSubtitlesFilesFromFS } from "../subtitles/subtitles.slice";

export const VideosView = () => {
  const videoFiles = useSelector((state: RootState) => state.videos.files);
  const currentVideoFileIndex = useSelector(
    (state: RootState) => state.videos.currentVideoIndex
  );
  const subtitleFiles = useSelector(
    (state: RootState) => state.subtitles.files
  );
  const currentSubtitleFileIndex = useSelector(
    (state: RootState) => state.subtitles.currentSubtitleIndex
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    // first loading of the local video files list
    dispatch(getVideoFilesFromFS());
  }, []);

  useEffect(() => {
    // the current video file has changed, we need to get and display all matching subtitles
    if (currentVideoFileIndex !== undefined) {
      dispatch(
        getMatchingSubtitlesFilesFromFS(videoFiles[currentVideoFileIndex])
      );
    }
  }, [currentVideoFileIndex]);

  useInput(async (input, key) => {
    if (currentVideoFileIndex === undefined) {
      return;
    }
    if (key.upArrow && currentVideoFileIndex > 0) {
      dispatch(setCurrentVideoIndex(currentVideoFileIndex - 1));
    } else if (key.downArrow && currentVideoFileIndex < videoFiles.length - 1) {
      dispatch(setCurrentVideoIndex(currentVideoFileIndex + 1));
    }
  });

  return (
    <Box flexDirection="row" flexGrow={1}>
      <FileSelector
        entries={videoFiles}
        selectedIndex={currentVideoFileIndex}
      />
      <FileSelector
        entries={subtitleFiles}
        selectedIndex={currentSubtitleFileIndex}
      />
    </Box>
  );
};
