import type { SelectedPokemon } from "@/types/pokemon";
import type { PokemonView } from "types";

const doesPokemonContainType = (
  pokemon: PokemonView,
  selectedTypes: string[]
): boolean =>
  selectedTypes.length === 0 ||
  pokemon.types.some((type) => selectedTypes.includes(type.name));

const doesPokemonNameContainSearchTerm = (
  pokemon: PokemonView,
  searchTerm: string
): boolean =>
  searchTerm === "" ||
  pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());

export const filterPokemons = (
  pokemons: PokemonView[],
  selectedTypes: string[],
  searchTerm: string
): PokemonView[] => {
  if (selectedTypes.length === 0 && searchTerm === "") {
    return pokemons;
  }

  return pokemons.filter(
    (pokemon) =>
      doesPokemonContainType(pokemon, selectedTypes) &&
      doesPokemonNameContainSearchTerm(pokemon, searchTerm)
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
