import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import PokemonCard from "./PokemonCard";
import type { PokemonView } from "types";
import { useResponsiveColumns } from "@/hooks/useResponsiveColumns";

interface PokemonVirtualListProps {
  pokemons: PokemonView[];
  onClick: (pokemonName: string) => void;
  selectedPokemonsName?: string[] | null;
}

const PokemonVirtualList = ({
  pokemons,
  onClick,
  selectedPokemonsName,
}: PokemonVirtualListProps) => {
  const parentRef = useRef(null);
  const itemsPerRow = useResponsiveColumns();
  const rowCount = Math.ceil(pokemons.length / itemsPerRow);
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 405,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="h-screen w-full overflow-y-auto">
      <div
        className={`relative max-w-7xl mx-auto h-[${rowVirtualizer.getTotalSize()}px]`}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * itemsPerRow;
          const endIndex = startIndex + itemsPerRow;
          const rowPokemons = pokemons.slice(startIndex, endIndex);

          return (
            <div
              key={virtualRow.key}
              className="absolute w-full top-0 left-0"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="grid one-card:grid-cols-1 two-cards:grid-cols-2 three-cards:grid-cols-3 four-cards:grid-cols-4 justify-items-center p-4">
                {rowPokemons.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    onClick={onClick}
                    isSelected={selectedPokemonsName?.includes(pokemon.name)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonVirtualList;
