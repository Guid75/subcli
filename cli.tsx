#!/usr/bin/env bun

import React, { useState, useEffect } from "react";
import { render, Box, useStdout } from "ink";
import terminalSize from "terminal-size";
import { FileBrowser } from "./src/FileBrowser";

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
    <Box width={width} height={height}>
      <FileBrowser />
    </Box>
  );
};
const r = render(<FullScreenApp />);

r.waitUntilExit();
setInterval(() => {}, 1000);
