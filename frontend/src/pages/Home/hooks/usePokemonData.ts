import { useSuspenseQueries } from "@tanstack/react-query";
import type { PokemonTypeView, PokemonView } from "types";
import { fetchPokemons, fetchTypes } from "../services/pokemon/pokemonApi";

export const usePokemonData = () => {
  const [pokemonResults, typesResults] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["pokemons"],
        queryFn: (): Promise<PokemonView[]> =>
          fetchPokemons().then((data) => data.pokemons),
      },
      {
        queryKey: ["types"],
        queryFn: (): Promise<PokemonTypeView[]> =>
          fetchTypes().then((data) => data.types),
      },
    ] as const,
  });

  return {
    pokemons: pokemonResults.data,
    types: typesResults.data,
  };
};
