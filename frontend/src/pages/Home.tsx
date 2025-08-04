import BattleModal from "@/components/BattleModal";
import ErrorFallback from "@/components/ErrorMessage";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import PokemonTypeFilter from "@/components/PokemonTypeFilter";
import PokemonVirtualList from "@/components/PokemonVirtualList";
import { API_URL } from "@/constants";
import { useSuspenseQueries } from "@tanstack/react-query";
import { Suspense, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { PokemonTypeView, PokemonView } from "types";

interface PokemonResponse {
  pokemons: PokemonView[];
}

interface TypesResponse {
  types: PokemonTypeView[];
}

const fetchPokemons = async (): Promise<PokemonResponse> => {
  const response = await fetch(`${API_URL}pokemons/all`);

  if (!response.ok) {
    throw new Error("Something went wrong while fetching pokemons");
  }

  return response.json();
};

const fetchTypes = async (): Promise<TypesResponse> => {
  const response = await fetch(`${API_URL}pokemons/types`);

  if (!response.ok) {
    throw new Error("Something went wrong while fetching types");
  }

  return response.json();
};

const PokemonList = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPokemonsName, setSelectedPokemonsName] = useState<string[]>(
    []
  );
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

  const toggleType = (typeName: string) =>
    setSelectedTypes((prevSelected) =>
      prevSelected.includes(typeName)
        ? prevSelected.filter((type) => type !== typeName)
        : [...prevSelected, typeName]
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

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const unSelectAllPokemons = () => setSelectedPokemonsName([]);

  const filteredPokemons = pokemonResults.data.filter(
    (pokemon) =>
      selectedTypes.length === 0 ||
      pokemon.types.some(({ name }) => selectedTypes.includes(name))
  );

  const selectedPokemonsWithImages = pokemonResults.data
    .filter((pokemon) => selectedPokemonsName.includes(pokemon.name))
    .map((pokemon) => ({
      name: pokemon.name,
      image: pokemon.image,
    }));

  return (
    <div>
      <PokemonTypeFilter
        types={typesResults.data}
        selectedTypes={selectedTypes}
        onClick={toggleType}
      />
      <PokemonVirtualList
        pokemons={filteredPokemons}
        onClick={togglePokemon}
        selectedPokemonsName={selectedPokemonsName}
      />
      {selectedPokemonsName.length > 0 && (
        <Footer
          selectedPokemons={selectedPokemonsWithImages}
          openBattleModal={openModal}
          unSelectAllPokemons={unSelectAllPokemons}
        />
      )}
      <BattleModal
        dialogRef={dialogRef}
        closeModal={closeModal}
        selectedPokemons={selectedPokemonsWithImages}
      />
    </div>
  );
};

const Home = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingSpinner />}>
        <PokemonList />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Home;
