import { Box, Text } from "ink";

export type Entry = {
  label: string;
  value: string;
};

export const EntrySelector = ({
  entries,
  selectedIndex,
}: {
  entries: Entry[];
  selectedIndex: number;
}) => {
  const entriesTextItems =
    entries.length > 0 ? (
      entries.map((entry, index) => (
        <Text
          key={entry.value}
          color="yellow"
          inverse={selectedIndex === index}
          wrap="truncate"
        >
          {entry.label}
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
    >
      {entriesTextItems}
    </Box>
  );
};
