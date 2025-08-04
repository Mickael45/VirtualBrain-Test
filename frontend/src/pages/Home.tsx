import PokemonVirtualList from "@/components/PokemonVirtualList";
import { API_URL } from "@/constants";
import { useQueries } from "@tanstack/react-query";
import type { PokemonView } from "types";

interface PokemonResponse {
  pokemons: PokemonView[];
}

const fetchPokemons = async (): Promise<PokemonResponse> => {
  const response = await fetch(`${API_URL}pokemons/all`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Home = () => {
  const results = useQueries({
    queries: [
      {
    queryKey: ["pokemons"],
        queryFn: () => fetchPokemons().then((data) => data.pokemons),
      },
    ],
  });

  if (results.some((query) => query.isLoading)) {
    return "Loading...";
  }

  if (results.some((query) => query.isError)) {
    return <div>An error occurred while fetching the pokemons data.</div>;
  }

  const [pokemonsResult] = results;

  if (!pokemonsResult || !pokemonsResult.data) {
    return <div>No pokemons found.</div>;
  }

  return (
    <div>
      <PokemonVirtualList pokemons={pokemonsResult.data} />
    </div>
  );
};

export default Home;
