#!/usr/bin/env bun

import { useState, useEffect } from "react";
import { render, Box, useStdout } from "ink";
import terminalSize from "terminal-size";
import { VideosView } from "./src/videos/VideosView";
import { Provider } from "react-redux";
import { store } from "./src/store";

const FullScreenApp = () => {
  const { columns, rows } = terminalSize();
  const [width, setWidth] = useState(columns - 1);
  const [height, setHeight] = useState(rows - 1);

  const { stdout } = useStdout();

  function resize() {
    const { columns, rows } = terminalSize();
    setWidth(columns - 1);
    setHeight(rows - 1);
  }

  useEffect(() => {
    stdout.on("resize", resize);
    return () => {
      stdout.off("resize", resize);
    };
  }, []);

  return (
    <Provider store={store}>
      <Box width={width} height={height}>
        <VideosView />
      </Box>
    </Provider>
  );
};
const r = render(<FullScreenApp />);

r.waitUntilExit();
setInterval(() => {}, 1000);
