import { usePokemonBattleStream } from "@/pages/Home/hooks/usePokemonBattleStream";
import type { SelectedPokemon } from "@/types/pokemon";
import { type RefObject } from "react";

interface BattleModalProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
  selectedPokemons: SelectedPokemon[];
  closeModal: () => void;
}

const BattleModal = ({
  dialogRef,
  closeModal,
  selectedPokemons,
}: BattleModalProps) => {
  const query = `Que se passe-t-il si ${selectedPokemons
    .map((p) => p.name)
    .join(" et ")} se battent ?`;
  const { streamedResponse, isLoading, isStreaming, handlePromptSubmit } =
    usePokemonBattleStream(query);

  return (
    <dialog
      ref={dialogRef}
      className="bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-900 m-auto h-fit text-white rounded-xl w-full max-w-3xl p-0 backdrop:bg-black backdrop:opacity-50"
    >
      <div className="px-4 py-4 bg-linear-65 from-red-500 to-blue-500 items-center justify-between flex">
        <h2 className="text-xl font-bold text-white">Pokemon Battle Arena</h2>
        <button onClick={closeModal} className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      </div>
      <div className="p-8">
        <div className="flex items-center mb-10 justify-around flex-wrap">
          {selectedPokemons.map(({ image, name }, index) => (
            <>
              <div
                key={name}
                className="grid border-1 border-dashed border-white rounded-xl p-4 items-center justify-center bg-gray-500"
              >
                <img src={image} alt={name} className="w-16 h-16 mr-2" />
                <span className="text-white">{name}</span>
              </div>
              {index < selectedPokemons.length - 1 && (
                <div className="bg-gray-500 rounded-lg px-2 py-1 mx-4">VS</div>
              )}
            </>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={handlePromptSubmit}
            disabled={isLoading || isStreaming}
            className="bg-linear-65 from-red-500 to-blue-500 text-white font-bold py-2 px-5 rounded-lg focus:outline-none disabled:opacity-50"
          >
            {isLoading || isStreaming
              ? "Battle in Progress..."
              : streamedResponse !== ""
              ? "Restart Battle !"
              : "Start Battle !"}
          </button>
        </div>
        {streamedResponse ? (
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded overflow-y-auto mt-4 bg-gray-800 text-white"
            readOnly
            value={streamedResponse}
          />
        ) : null}
      </div>
    </dialog>
  );
};

export default BattleModal;
