import axios from "axios";
import { type Request, type Response, Router } from "express";
import { POKEMON_API_URL } from "../constants";
import { Pokemon } from "../types/Pokemon";

const PokemonController = Router();

PokemonController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("coucou");
  const result = await axios.get(`${POKEMON_API_URL}/pokemon/${id}`);

  const pokemon = result.data as Pokemon;

  return res.status(200).send({ pokemon });
});

export { PokemonController };
