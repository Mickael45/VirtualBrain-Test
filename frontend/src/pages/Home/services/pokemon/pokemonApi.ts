import { API_URL } from "@/constants";
import type { PokemonTypeView, PokemonView } from "types";
import { isPokemonView } from "./schema";

interface PokemonResponse {
  pokemons: PokemonView[];
}

interface TypesResponse {
  types: PokemonTypeView[];
}

export const fetchPokemons = async (): Promise<PokemonResponse> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}pokemons/all`);

    if (!response.ok) {
      throw new Error("Something went wrong while fetching pokemons");
    }

    const data = await response.json();

    if (
      !data ||
      !Array.isArray(data.pokemons) ||
      !data.pokemons.every(isPokemonView)
    ) {
      throw new Error("Invalid response format for pokemons");
    }

    return data;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    return { pokemons: [] };
  }
};

export const fetchTypes = async (): Promise<TypesResponse> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}pokemons/types`
    );

    if (!response.ok) {
      throw new Error("Something went wrong while fetching types");
    }

    const data = await response.json();

    if (
      !data ||
      !Array.isArray(data.types) ||
      !data.types.every((type: unknown) => typeof type === "string")
    ) {
      throw new Error("Invalid response format for types");
    }

    return data;
  } catch (error) {
    console.error("Error fetching types:", error);
    return { types: [] };
  }
};
