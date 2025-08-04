import LoadingSpinner from "@/components/LoadingSpinner";
import PokemonVirtualList from "@/components/PokemonVirtualList";
import { API_URL } from "@/constants";
import { useSuspenseQueries } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { ApiPokemonType, PokemonView } from "types";

interface PokemonResponse {
  pokemons: PokemonView[];
}

interface TypesResponse {
  types: ApiPokemonType[];
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

const PokemonContent = () => {
  const results = useSuspenseQueries({
    queries: [
      {
        queryKey: ["pokemons"],
        queryFn: () => fetchPokemons().then((data) => data.pokemons),
      },
      {
        queryKey: ["types"],
        queryFn: () => fetchTypes().then((data) => data.types),
      },
    ],
  });

  const [pokemonsData, typesData] = results.map((result) => result.data);

  return (
    <div>
      <PokemonVirtualList pokemons={pokemonsData} />
    </div>
  );
};

const ErrorFallback = ({ error }: { error: Error }) => (
  <div>An error occurred while fetching the pokemons data: {error.message}</div>
);

const Home = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingSpinner />}>
        <PokemonContent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Home;
