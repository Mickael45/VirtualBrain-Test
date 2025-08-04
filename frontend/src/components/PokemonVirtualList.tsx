import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import PokemonCard from "./PokemonCard";
import type { PokemonView } from "types";

interface PokemonVirtualListProps {
  pokemons: PokemonView[];
}

const PokemonVirtualList = ({ pokemons }: PokemonVirtualListProps) => {
  const parentRef = useRef(null);
  const itemsPerRow = 4;
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
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * itemsPerRow;
          const endIndex = startIndex + itemsPerRow;
          const rowPokemons = pokemons.slice(startIndex, endIndex);

          return (
            <div
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="grid grid-cols-4 justify-items-center p-4">
                {rowPokemons.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
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
