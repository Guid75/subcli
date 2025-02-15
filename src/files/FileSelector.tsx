import path from "node:path";
import { Box, Text } from "ink";

export type Entry = {
  label: string;
  value: string;
};

export const FileSelector = ({
  entries,
  selectedIndex,
}: {
  entries: string[];
  selectedIndex?: number;
}) => {
  const entriesTextItems =
    entries.length > 0 ? (
      entries.map((entry, index) => (
        <Text
          key={entry}
          color="yellow"
          inverse={selectedIndex === index}
          wrap="truncate"
        >
          {path.basename(entry)}
        </Text>
      ))
    ) : (
      <Text color="yellow">&lt;No files found&gt;</Text>
    );

  return (
    <Box
      flexGrow={1}
      borderStyle="round"
      borderColor="cyan"
      flexDirection="column"
      overflow="hidden"
    >
      {entriesTextItems}
    </Box>
  );
};
