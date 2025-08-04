import { API_URL } from "@/constants";
import type { PokemonTypeView, PokemonView } from "types";

interface PokemonResponse {
  pokemons: PokemonView[];
}

interface TypesResponse {
  types: PokemonTypeView[];
}

export const fetchPokemons = async (): Promise<PokemonResponse> => {
  const response = await fetch(`${API_URL}pokemons/all`);

  if (!response.ok) {
    throw new Error("Something went wrong while fetching pokemons");
  }

  return response.json();
};

export const fetchTypes = async (): Promise<TypesResponse> => {
  const response = await fetch(`${API_URL}pokemons/types`);

  if (!response.ok) {
    throw new Error("Something went wrong while fetching types");
  }

  return response.json();
};
