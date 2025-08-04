import { type Request, type Response, Router } from "express";
import {
  getAllPokemons,
  getPokemonById,
  getPokemonTypes,
} from "../../services/pokemonApiService";
import { toPokemonTypeView, toPokemonView } from "./pokemonMapper";

const PokemonController = Router();

PokemonController.get("/types", async (_req: Request, res: Response) => {
  try {
    const types = await getPokemonTypes();
    const typesView = types.map(toPokemonTypeView);

    return res.status(200).send({ types: typesView });
  } catch (error) {
    console.error("Error getting Pokemon types:", error);
    return res.status(500).send("Failed to get Pokemon types");
  }
});

PokemonController.get("/all", async (_req: Request, res: Response) => {
  try {
    const pokemons = await getAllPokemons();
    const pokemonsView = pokemons.map(toPokemonView);

    return res.status(200).send({ pokemons: pokemonsView });
  } catch (error) {
    console.error("Error getting Pokemons:", error);
    return res.status(500).send("Failed to get Pokemons");
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
    const pokemon = await getPokemonById(id);

    if (!pokemon) {
      return res.status(404).send("Pokemon not found");
    }

    const pokemonView = toPokemonView(pokemon);

    return res.status(200).send({ pokemon: pokemonView });
  } catch (error) {
    console.error("Error getting Pokemon with ID:", id, error);
    return res.status(500).send("Failed to get Pokemon by ID");
  }
});

export { PokemonController };
