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
      throw new Error(
        "Une erreur s'est produite lors de la récupération des pokémons"
      );
    }

    const data = await response.json();

    if (
      !data ||
      !Array.isArray(data.pokemons) ||
      !data.pokemons.every(isPokemonView)
    ) {
      throw new Error("Format de réponse invalide pour les pokémons");
    }

    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des pokémons:", error);
    return { pokemons: [] };
  }
};

export const fetchTypes = async (): Promise<TypesResponse> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}pokemons/types`
    );

    if (!response.ok) {
      throw new Error(
        "Une erreur s'est produite lors de la récupération des types"
      );
    }

    const data = await response.json();

    if (
      !data ||
      !Array.isArray(data.types) ||
      !data.types.every((type: unknown) => typeof type === "string")
    ) {
      throw new Error("Format de réponse invalide pour les types");
    }

    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des types:", error);
    return { types: [] };
  }
};
