import axios from "axios";
import { type Request, type Response, Router } from "express";
import { POKEMON_API_URL } from "../constants";
import { Pokemon } from "../types/Pokemon";

const PokemonController = Router();

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
