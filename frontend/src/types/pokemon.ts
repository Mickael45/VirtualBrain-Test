import type { PokemonView } from "types";

export type SelectedPokemon = Pick<PokemonView, "name" | "image">;
