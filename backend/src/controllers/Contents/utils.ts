import { promises as fs } from "fs";
import path from "path";

export const createExportsDir = async (): Promise<string | undefined> => {
  try {
    const exportsDir = path.join(__dirname, "..", "exports");

    await fs.mkdir(exportsDir);

    return exportsDir;
  } catch (error) {
    console.error("Error creating exports directory:", error);
  }
};
