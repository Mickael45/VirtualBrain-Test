import axios from "axios";
import { POKEMON_API_URL } from "../constants";
import { Pokemon, PokemonType } from "../controllers/PokemonController";

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    const response = await axios.get(`${POKEMON_API_URL}/pokemon/${id}`);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch Pokemon with ID ${id}`);
    }

    return response.data as Pokemon;
  } catch (error) {
    console.error(`Error fetching Pokemon with ID ${id}:`, error);
    throw new Error("Failed to fetch Pokemon data");
  }
};

export const getAllPokemons = async (): Promise<Pokemon[]> => {
  try {
    const response = await axios.get(`${POKEMON_API_URL}/pokemon`);

    if (response.status !== 200) {
      throw new Error("Failed to fetch Pokemons");
    }

    return response.data as Pokemon[];
  } catch (error) {
    console.error("Error fetching Pokemons:", error);
    throw new Error("Failed to fetch Pokemons data");
  }
};

export const getPokemonTypes = async (): Promise<PokemonType[]> => {
  try {
    const response = await axios.get(`${POKEMON_API_URL}/types`);

    if (response.status !== 200) {
      throw new Error("Failed to fetch Pokemon types");
    }

    return response.data as PokemonType[];
  } catch (error) {
    console.error("Error fetching Pokemon types:", error);
    throw new Error("Failed to fetch Pokemon types data");
  }
};
