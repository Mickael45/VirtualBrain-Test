import { useState } from "react";

export const usePokemonSelection = () => {
  const [selectedPokemonsName, setSelectedPokemonsName] = useState<string[]>(
    []
  );

  const togglePokemon = (pokemonName: string) => {
    setSelectedPokemonsName((prevSelected) => {
      if (prevSelected.includes(pokemonName)) {
        return prevSelected.filter((name) => name !== pokemonName);
      }

      if (prevSelected.length >= 4) {
        alert("You can only select up to 4 Pokémon at a time.");
        return prevSelected;
      }

      return [...prevSelected, pokemonName];
    });
  };

  const unSelectAllPokemons = () => setSelectedPokemonsName([]);

  return {
    selectedPokemonsName,
    togglePokemon,
    unSelectAllPokemons,
  };
};
