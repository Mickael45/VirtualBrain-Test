import { type Request, type Response, Router } from "express";
import {
  getAllPokemons,
  getPokemonById,
} from "../../services/pokemonApiService";
import { savePokemonMarkdown } from "./utils";
import { pokemonJsonToMd } from "./pokemonJsonToMdConverter";

const ContentController = Router();

/**
 * Save all pokemon as markdown in markdown folder
 * @route GET /contents/all
 * @group Contents
 */
ContentController.get("/all", async (_req: Request, res: Response) => {
  try {
    const pokemons = await getAllPokemons();

    pokemons
      .map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        markdown: pokemonJsonToMd(pokemon),
      }))
      .forEach(({ name, id, markdown }) =>
        savePokemonMarkdown(name, id, markdown)
      );

    return res.status(200).send({
      message: `All Pokemon saved successfully`,
    });
  } catch (error) {
    console.error("Error saving Pokemons:", error);
    return res.status(500).send("Failed to save Pokemons");
  }
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
    const pokemon = await getPokemonById(id);
    const pokemonMarkdown = pokemonJsonToMd(pokemon);
    const { name, pokedexId } = pokemon;

    savePokemonMarkdown(name, pokedexId, pokemonMarkdown);
    return res.status(200).send({
      message: `Pokemon ${name} saved successfully`,
    });
  } catch (error) {
    console.error("Error saving Pokemon:", error);
    return res.status(500).send("Failed to save Pokemon");
  }
});

export { ContentController };
