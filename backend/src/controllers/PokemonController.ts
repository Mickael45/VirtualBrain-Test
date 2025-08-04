import { type Request, type Response, Router } from "express";
import { Pokemon } from "../types/Pokemon";
import { getAllPokemons, getPokemonById } from "../services/pokemonApiService";

const PokemonController = Router();

PokemonController.get("/all", async (_req: Request, res: Response) => {
  try {
    const pokemons = (await getAllPokemons()) as Pokemon[];

    return res.status(200).send({ pokemons });
  } catch (error) {
    console.error("Error saving Pokemons:", error);
    return res.status(500).send("Failed to save Pokemons");
  }
});

PokemonController.get("/:pokemonId", async (_req: Request, res: Response) => {
  const { pokemonId } = _req.params;

  if (!pokemonId) {
    return res.status(400).send("Pokemon ID is required");
  }

  const id = Number(pokemonId);

  if (isNaN(id) || id <= 0 || id > 898) {
    return res.status(400).send("Invalid Pokemon ID");
  }

  try {
    const pokemon = (await getPokemonById(id)) as Pokemon;

    return res.status(200).send({ pokemon });
  } catch (error) {
    console.error("Error getting Pokemon with ID:", id, error);
    return res.status(500).send("Failed to get Pokemon by ID");
  }
});

export { PokemonController };
