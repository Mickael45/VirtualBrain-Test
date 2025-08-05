import type { SelectedPokemon } from "@/types/pokemon";

interface FooterProps {
  selectedPokemons: SelectedPokemon[];
  openBattleModal: () => void;
  unSelectAllPokemons: () => void;
}

const PokemonPlaceholder = ({
  name,
  image,
  index,
}: {
  name: string;
  image: string;
  index: number;
}) => (
  <div className="bg-gray-500 border-1 border-dashed border-white rounded-lg py-3 pl-2 pr-4 flex items-center">
    <div className="bg-blue-300 rounded-full p-1 mr-2">
      <img src={image} alt={name} className="w-9 h-9" />
    </div>
    <span className="grid grid-cols-1 text-left font-semibold">
      <span className="text-sm">Combattant {index}</span>
      <span className="text-xs">{name}</span>
    </span>
  </div>
);

const Footer = ({
  selectedPokemons,
  openBattleModal,
  unSelectAllPokemons,
}: FooterProps) => (
  <footer className="fixed bottom-0 w-full bg-gray-800 min-h-30 text-white py-4">
    <div className="w-full max-w-7xl mx-auto flex items-center">
      <span className="flex justify-between items-center w-full">
        <div className="flex flex-wrap items-center justify-around">
          {selectedPokemons.map(({ name, image }, index) => (
            <div
              key={name}
              className={`flex items-center gap-4 ${
                index < selectedPokemons.length - 1 ? "mr-4" : ""
              }`}
            >
              <PokemonPlaceholder name={name} image={image} index={index + 1} />
              {index < selectedPokemons.length - 1 && (
                <div className="bg-gray-500 rounded-lg px-2 py-1">VS</div>
              )}
            </div>
          ))}
        </div>
        <div className="flex">
          <button
            className="bg-red-500 text-white rounded-lg px-4 py-2 mr-2"
            onClick={unSelectAllPokemons}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2 disabled:opacity-50"
            disabled={selectedPokemons.length < 2}
            onClick={openBattleModal}
          >
            Démarrer le combat !
          </button>
        </div>
      </span>
    </div>
  </footer>
);

export default Footer;
