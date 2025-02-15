import fs from "node:fs/promises";
import path from "node:path";

export async function getFilesFromFS({
  root,
  extensions,
  constraintBasename,
  recursive,
}: {
  root: string;
  extensions: string[];
  constraintBasename?: string;
  recursive?: boolean;
}) {
  const files = (await fs.readdir(root, { recursive }))
    .filter((file) => extensions.some((ext) => file.endsWith(ext)))
    .filter((file) => {
      if (!constraintBasename) {
        return true;
      }
      return (
        getBasenameWithoutExtension(constraintBasename) ===
        getBasenameWithoutExtension(file)
      );
    })
    .map((file) => path.join(root, file));

  return files;
}

function getBasenameWithoutExtension(file: string) {
  return path.basename(file, path.extname(file));
}
