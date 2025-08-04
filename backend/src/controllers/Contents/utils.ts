import { promises as fs } from "fs";
import path from "path";

export const createExportsDir = async (): Promise<string | undefined> => {
  try {
    const exportDirectoryPath = path.join(__dirname, "..", "exports");
    const exportFolderExists = await fs
      .access(exportDirectoryPath)
      .then(() => true)
      .catch(() => false);

    if (exportFolderExists) {
      return exportDirectoryPath;
    }

    await fs.mkdir(exportDirectoryPath);

    return exportDirectoryPath;
  } catch (error) {
    console.error("Error creating exports directory:", error);
  }
};
