import { type Request, type Response, Router } from "express";
import { getPokemonById } from "../../services/pokemonApiService";

const ContentController = Router();

/**
 * Save all pokemon as markdown in markdown folder
 * @route GET /contents/all
 * @group Contents
 */
ContentController.get("/all", async (_req: Request, res: Response) => {
  return res.sendStatus(200);
});

/**
 * Return a pokemon as markdown
 * @route GET /contents/:id
 * @group Contents
 * @param {string} id.path.required - Pokemon ID
 */
ContentController.get("/:pokemonId", async (_req: Request, res: Response) => {
  const { pokemonId } = _req.params;

  if (!pokemonId) {
    return res.status(400).send("Pokemon ID is required");
  }

  const id = Number(pokemonId);

  if (isNaN(id) || id <= 0 || id > 898) {
    return res.status(400).send("Invalid Pokemon ID");
  }

  try {
    const pokemon = await getPokemonById(Number(pokemonId));

    return res.send({
      pokemon,
    });
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    return res.status(500).send("Failed to fetch Pokemon");
  }
});

export { ContentController };
