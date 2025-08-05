import { useState } from "react";
import toast from "react-hot-toast";

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
        toast.error("Vous ne pouvez sélectionner que 4 Pokémon à la fois.");
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
