import type { PokemonView } from "types";

interface PokemonCardProps {
  pokemon: PokemonView;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col items-center">
      <h2 className="text-xl font-bold">{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} className="w-10 h-10" />
    </div>
  );
};

export default PokemonCard;
