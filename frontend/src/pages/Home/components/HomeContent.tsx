import BattleModal from "@/components/BattleModal";
import Footer from "@/components/Footer";
import PokemonTypeFilter from "@/components/PokemonTypeFilter";
import PokemonVirtualList from "@/components/PokemonVirtualList";
import { usePokemonData } from "@/pages/Home/hooks/usePokemonData";
import { useRef, useState } from "react";
import { usePokemonSelection } from "../hooks/usePokemonSelection";
import { useTypeSelection } from "../hooks/useTypeSelection";
import {
  filterPokemons,
  filterSelectedPokemons,
} from "../utils/pokemonFilters";
import Header from "@/components/Header";

const HomeContent = () => {
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
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="h-screen flex flex-col items-center">
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
    </>
  );
};

export default HomeContent;
