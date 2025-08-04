import type { SelectedPokemon } from "@/types/pokemon";
import type { PokemonView } from "types";

export const filterPokemonsByTypes = (
  pokemons: PokemonView[],
  selectedTypes: string[]
): PokemonView[] => {
  if (selectedTypes.length === 0) {
    return pokemons;
  }

  return pokemons.filter((pokemon) =>
    pokemon.types.some(({ name }) => selectedTypes.includes(name))
  );
};

export const filterSelectedPokemons = (
  pokemons: PokemonView[],
  selectedPokemonsName: string[]
): SelectedPokemon[] =>
  pokemons
    .filter((pokemon) => selectedPokemonsName.includes(pokemon.name))
    .map((pokemon) => ({
      name: pokemon.name,
      image: pokemon.image,
    }));
