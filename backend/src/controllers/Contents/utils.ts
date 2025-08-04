import { promises as fs } from "fs";
import path from "path";

const createExportsDir = async (): Promise<string | undefined> => {
  try {
    const exportDirectoryPath = path.join(process.cwd(), "exports");
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
  pokemonMarkdown: string
) => {
  try {
    const exportDirectory = await createExportsDir();

    if (!exportDirectory) {
      console.error("Export directory not found or could not be created.");
      return;
    }

    const filePath = path.join(
      exportDirectory,
      `(${pokemonId}) - ${pokemonName}.md`
    );

    await fs.writeFile(filePath, pokemonMarkdown, "utf8");
  } catch (error) {
    console.error("Error saving Pokemon markdown:", error);
  }
};
