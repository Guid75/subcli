import fs from "node:fs/promises";
import path from "node:path";
import { create } from "zustand";
import { combine } from "zustand/middleware";

type ViewType = "file" | "subtitle" | "subtitle-editor";

function getBasenameWithoutExtension(file: string) {
  return path.basename(file, path.extname(file));
}

async function getFilesFromFS({
  root,
  extensions,
  basename,
  recursive,
}: {
  root: string;
  extensions: string[];
  basename?: string;
  recursive?: boolean;
}) {
  const files = (await fs.readdir(root, { recursive }))
    .filter((file) => extensions.some((ext) => file.endsWith(ext)))
    .filter((file) => {
      if (!basename) {
        return true;
      }
      return (
        getBasenameWithoutExtension(basename) ===
        getBasenameWithoutExtension(file)
      );
    })
    .map((file) => path.join(root, file));

  return files;
}

const FILE_EXTENSIONS = ["mp4", "mkv", "srt"];

async function detectFiles(extensions: string[]) {
  return (
    await getFilesFromFS({ root: process.cwd(), extensions, recursive: true })
  ).map((file) => {
    return {
      label: path.basename(file),
      value: file,
    };
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

const SUBTITLE_EXTENSIONS = [
  "srt", // SubRip
  "ass",
];

export async function detectVideoFiles() {
  return detectFiles(VIDEO_EXTENSIONS);
}

async function detectSubtitleFilesFor(videoFilePath: string) {
  return (
    await getFilesFromFS({
      root: path.dirname(videoFilePath),
      extensions: SUBTITLE_EXTENSIONS,
      basename: path.basename(videoFilePath),
    })
  ).map((file) => {
    return {
      label: path.basename(file),
      value: file,
    };
  });
}

export const useGlobal = create(
  combine(
    {
      viewType: "file" as ViewType,
      videoFiles: [] as { label: string; value: string }[],
      subtitleFiles: [] as { label: string; value: string }[],
      currentVideoFileIndex: -1,
      currentSubtitleFileIndex: -1,
    },
    (set, get) => ({
      setViewType: (viewType: ViewType) => set({ viewType }),
      setVideoFiles: async (files: { label: string; value: string }[]) => {
        const currentIndex = files.length > 0 ? 0 : -1;
        set({
          videoFiles: files,
          currentVideoFileIndex: currentIndex,
          subtitleFiles: [],
        });
        if (currentIndex >= 0) {
          const subtitleFiles = await detectSubtitleFilesFor(
            files[currentIndex].value
          );
          set({ subtitleFiles, currentSubtitleFileIndex: 0 });
        }
      },
      setCurrentVideoFileIndex: async (index: number) => {
        const nextVideoFileIndex = index < get().videoFiles.length ? index : -1;
        set({
          currentVideoFileIndex: nextVideoFileIndex,
        });
        if (nextVideoFileIndex >= 0) {
          const subtitleFiles = await detectSubtitleFilesFor(
            get().videoFiles[nextVideoFileIndex].value
          );
          set({ subtitleFiles, currentSubtitleFileIndex: 0 });
        } else {
          set({ subtitleFiles: [], currentSubtitleFileIndex: -1 });
        }
      },
      setCurrentSubtitleFileIndex: (index: number) => {
        set({ currentSubtitleFileIndex: index });
      },
    })
  )
);
