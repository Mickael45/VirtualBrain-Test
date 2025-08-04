import ErrorFallback from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "@/components/Footer";
import PokemonTypeFilter from "@/components/PokemonTypeFilter";
import PokemonVirtualList from "@/components/PokemonVirtualList";
import { usePokemonData } from "@/pages/Home/hooks/usePokemonData";
import { useRef, useState } from "react";
import Header from "@/components/Header";
import { usePokemonSelection } from "./hooks/usePokemonSelection";
import { useTypeSelection } from "./hooks/useTypeSelection";
import { filterPokemons, filterSelectedPokemons } from "./utils/pokemonFilters";
import BattleModal from "@/features/BattleArena/components/BattleModal";

const ONE_HOUR_IN_MS = 1000 * 60 * 60;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_HOUR_IN_MS,
    },
  },
});

const Content = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { selectedTypes, toggleType } = useTypeSelection();
  const { selectedPokemonsName, togglePokemon, unSelectAllPokemons } =
    usePokemonSelection();
  const [searchTerm, setSearchTerm] = useState("");
  const { pokemons, types } = usePokemonData();

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

  const filteredPokemons = filterPokemons(pokemons, selectedTypes, searchTerm);
  const selectedPokemons = filterSelectedPokemons(
    pokemons,
    selectedPokemonsName
  );

  return (
    <div className="h-screen flex flex-col w-full items-start">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex h-9/10 flex-col w-full items-center">
        <PokemonTypeFilter
          types={types}
          selectedTypes={selectedTypes}
          onClick={toggleType}
        />
        {filteredPokemons.length > 0 ? (
          <PokemonVirtualList
            pokemons={filteredPokemons}
            onClick={togglePokemon}
            selectedPokemonsName={selectedPokemonsName}
          />
        ) : (
          <div className="text-center h-screen items-center grid text-white">
            No Pokémon found
          </div>
        )}
        {selectedPokemonsName.length > 0 && (
          <Footer
            selectedPokemons={selectedPokemons}
            openBattleModal={openModal}
            unSelectAllPokemons={unSelectAllPokemons}
          />
        )}
        <BattleModal
          dialogRef={dialogRef}
          closeModal={closeModal}
          selectedPokemons={selectedPokemons}
        />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner />}>
          <Content />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default Home;
