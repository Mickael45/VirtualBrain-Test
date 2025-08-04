import { typeToColorMapper } from "@/pages/Home/utils/typeToColorMapper";
import type { PokemonView } from "types";
import StatBar from "./StatsBar";
import { POKEMON_IMAGE_URL } from "@/constants";

interface PokemonCardProps {
  pokemon: PokemonView;
  onClick: (pokemonName: string) => void;
  isSelected?: boolean;
}

const PokemonCard = ({ pokemon, isSelected, onClick }: PokemonCardProps) => {
  const firstType = pokemon.types[0];
  const cardColor = typeToColorMapper(firstType.name);
  const evolvesFromImage = pokemon.evolvesFrom
    ? `${POKEMON_IMAGE_URL}${pokemon.evolvesFrom.pokedexId}.png`
    : null;

  const handleClick = () => onClick(pokemon.name);

  return (
    <div
      className={`p-2 bg-yellow-400 w-70 rounded-xl transform hover:scale-105 transition-transform duration-300 font-sans ${
        isSelected
          ? "outline-offset-3 outline-dashed outline-2 outline-white"
          : ""
      }`}
      onClick={handleClick}
    >
      <div className={`${cardColor} rounded-md text-white`}>
        <div className="p-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg flex font-bold capitalize justify-between items-center">
              {pokemon.evolvesFrom && evolvesFromImage ? (
                <div className="w-10 h-10 flex items-center mr-1 justify-center bg-gray-100 border-2 border-yellow-500 rounded-full">
                  <img
                    src={evolvesFromImage}
                    alt={pokemon.evolvesFrom.name}
                    className="w-8 h-8 object-contain"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className=" h-10"></div>
              )}

              {pokemon.name}
            </h2>
            <div className="flex items-center">
              <span className="text-xs font-bold mr-1">HP</span>
              <span className="text-md font-bold mr-2">{pokemon.stats.HP}</span>
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 border-2 border-yellow-500 rounded-full">
                <img
                  src={firstType.image}
                  className="w-8 h-8 object-contain"
                  alt={firstType.name}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-2 mb-2 border-4 border-yellow-500 bg-gray-500 shadow-inner">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-full h-48 object-contain"
            loading="lazy"
          />
        </div>

        <div className="mx-2 p-2 pb-4">
          <div className="space-y-3">
            <StatBar label="Attack" value={pokemon.stats.attack} />
            <StatBar label="Defense" value={pokemon.stats.defense} />
            <StatBar label="Speed" value={pokemon.stats.speed} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
