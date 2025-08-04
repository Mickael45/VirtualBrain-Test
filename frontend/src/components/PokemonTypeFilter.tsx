import { typeToColorMapper } from "@/utils/typeToColorMapper";
import type { PokemonTypeView } from "types";

interface PokemonTypeFilterProps {
  types: PokemonTypeView[];
  selectedTypes: string[];
  onClick: (typeName: string) => void;
}

const PokemonTypeFilter = ({
  types,
  selectedTypes,
  onClick,
}: PokemonTypeFilterProps) => (
  <div className="flex flex-wrap max-w-7xl mx-auto justify-center mb-4">
    {types.map(({ name }) => (
      <button
        key={name}
        className={`${typeToColorMapper(name)} ${
          selectedTypes.includes(name) ? "ring-2 ring-red-500" : ""
        } px-4 py-2 m-1 rounded text-white`}
        onClick={() => onClick(name)}
      >
        {name}
      </button>
    ))}
  </div>
);

export default PokemonTypeFilter;
