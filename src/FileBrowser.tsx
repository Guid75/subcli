import fs from "node:fs/promises";
import path from "node:path";
import { Box, Text, useInput, type Key } from "ink";
import { detectVideoFiles, useGlobal } from "./state";
import { useEffect } from "react";
import { EntrySelector } from "./EntrySelector";

export const FileBrowser = () => {
  const {
    videoFiles,
    setVideoFiles,
    currentVideoFileIndex,
    setCurrentVideoFileIndex,
    subtitleFiles,
    currentSubtitleFileIndex,
  } = useGlobal();

  useInput(async (input, key) => {
    if (key.upArrow && currentVideoFileIndex > 0) {
      setCurrentVideoFileIndex(currentVideoFileIndex - 1);
    } else if (key.downArrow && currentVideoFileIndex < videoFiles.length - 1) {
      setCurrentVideoFileIndex(currentVideoFileIndex + 1);
    }
  });

  useEffect(() => {
    detectVideoFiles().then(setVideoFiles);
  }, []);

  return (
    <Box flexDirection="row" flexGrow={1}>
      <EntrySelector
        entries={videoFiles}
        selectedIndex={currentVideoFileIndex}
      />
      <EntrySelector
        entries={subtitleFiles}
        selectedIndex={currentSubtitleFileIndex}
      />
    </Box>
  );
};
