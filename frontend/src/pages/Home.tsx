import ErrorFallback from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import PokemonTypeFilter from "@/components/PokemonTypeFilter";
import PokemonVirtualList from "@/components/PokemonVirtualList";
import { API_URL } from "@/constants";
import { useSuspenseQueries } from "@tanstack/react-query";
import { Suspense, useState } from "react";
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
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
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

  const filteredPokemons = pokemonResults.data.filter(
    (pokemon) =>
      selectedTypes.length === 0 ||
      pokemon.types.some(({ name }) => selectedTypes.includes(name))
  );

  return (
    <div>
      <PokemonTypeFilter
        types={typesResults.data}
        selectedTypes={selectedTypes}
        onClick={toggleType}
      />
      <PokemonVirtualList pokemons={filteredPokemons} />
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
