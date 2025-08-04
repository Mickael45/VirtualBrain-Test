import { typeToColorMapper } from "@/pages/Home/utils/typeToColorMapper";

interface PokemonTypeFilterProps {
  types: string[];
  selectedTypes: string[];
  onClick: (type: string) => void;
}

const PokemonTypeFilter = ({
  types,
  selectedTypes,
  onClick,
}: PokemonTypeFilterProps) => (
  <div className="flex flex-wrap max-w-7xl mx-auto justify-center mb-4">
    {types.map((type) => (
      <button
        key={type}
        className={`${typeToColorMapper(type)} ${
          selectedTypes.includes(type) ? "ring-3 ring-yellow-400" : ""
        } px-4 py-2 m-1 rounded text-white`}
        onClick={() => onClick(type)}
      >
        {type}
      </button>
    ))}
  </div>
);

export default PokemonTypeFilter;
