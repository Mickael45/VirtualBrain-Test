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

export const savePokemonMarkdown = async (
  pokemonName: string,
  pokemonId: number,
  pokemonMarkdown: string,
  exportsDir: string
) => {
  try {
    const filePath = path.join(
      exportsDir,
      `(${pokemonId}) - ${pokemonName}.md`
    );

    await fs.writeFile(filePath, pokemonMarkdown, "utf8");
  } catch (error) {
    console.error("Error saving Pokemon markdown:", error);
  }
};
