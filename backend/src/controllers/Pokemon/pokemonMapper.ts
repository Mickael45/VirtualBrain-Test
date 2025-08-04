import { Pokemon, PokemonView } from "types";

export const toPokemonView = (pokemon: Pokemon): PokemonView => ({
  id: pokemon.id,
  name: pokemon.name,
  image: pokemon.image,
  stats: {
    HP: pokemon.stats.HP,
    attack: pokemon.stats.attack,
    defense: pokemon.stats.defense,
    speed: pokemon.stats.speed,
  },
  types: pokemon.apiTypes.map(({ name }) => name),
  evolvesFrom:
    pokemon.apiPreEvolution !== "none"
      ? {
          name: pokemon.apiPreEvolution.name,
          pokedexId: pokemon.apiPreEvolution.pokedexIdd,
        }
      : null,
});
