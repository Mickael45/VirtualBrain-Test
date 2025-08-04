import PokemonVirtualList from "@/components/PokemonVirtualList";
import { useQuery } from "@tanstack/react-query";
import type { PokemonView } from "types";

interface PokemonResponse {
  pokemons: PokemonView[];
}

const Home = () => {
  const { isPending, error, data } = useQuery<PokemonResponse>({
    queryKey: ["pokemons"],
    queryFn: () =>
      fetch("http://localhost:3001/pokemons/all").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data || !data.pokemons) return "No Pokémon data found";

  return (
    <div>
      <PokemonVirtualList pokemons={data.pokemons} />
    </div>
  );
};

export default Home;
