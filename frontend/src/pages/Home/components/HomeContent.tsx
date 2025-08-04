import BattleModal from "@/components/BattleModal";
import Footer from "@/components/Footer";
import PokemonTypeFilter from "@/components/PokemonTypeFilter";
import PokemonVirtualList from "@/components/PokemonVirtualList";
import { usePokemonData } from "@/pages/Home/hooks/usePokemonData";
import { useRef } from "react";
import { usePokemonSelection } from "../hooks/usePokemonSelection";
import { useTypeSelection } from "../hooks/useTypeSelection";
import {
  filterPokemonsByTypes,
  filterSelectedPokemons,
} from "../utils/pokemonFilters";

const HomeContent = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { selectedTypes, toggleType } = useTypeSelection();
  const { selectedPokemonsName, togglePokemon, unSelectAllPokemons } =
    usePokemonSelection();
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

  const filteredPokemons = filterPokemonsByTypes(pokemons, selectedTypes);
  const selectedPokemons = filterSelectedPokemons(
    pokemons,
    selectedPokemonsName
  );

  return (
    <div className="h-screen flex flex-col items-center">
      <PokemonTypeFilter
        types={types}
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
  );
};

export default HomeContent;
