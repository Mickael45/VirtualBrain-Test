import {
  ApiPokemonType,
  Evolution,
  Pokemon,
  PokemonTypeView,
  PokemonView,
  PreEvolution,
  StatBlockView,
} from "types";

const toStatBlockView = ({
  HP,
  attack,
  defense,
  speed,
}: Pokemon["stats"]): StatBlockView => ({
  HP,
  attack,
  defense,
  speed,
});

const toEvolutionView = (
  preEvolution: PreEvolution | "none"
): Evolution | null =>
  preEvolution !== "none"
    ? {
        name: preEvolution.name,
        pokedexId: preEvolution.pokedexIdd,
      }
    : null;

export const toPokemonView = (pokemon: Pokemon): PokemonView => ({
  id: pokemon.id,
  name: pokemon.name,
  image: pokemon.image,
  stats: toStatBlockView(pokemon.stats),
  types: pokemon.apiTypes,
  evolvesFrom: toEvolutionView(pokemon.apiPreEvolution),
});

export const toPokemonTypeView = ({ name }: ApiPokemonType): PokemonTypeView =>
  name;
