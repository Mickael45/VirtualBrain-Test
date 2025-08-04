import type { PokemonView, PokemonType, StatBlockView } from "types";
import { z } from "zod";

function createValidatedSchema<T extends Record<string, any>>(shape: {
  [K in keyof T]: z.ZodType<T[K]>;
}) {
  type Shape = typeof shape;

  return z.object<Shape>(shape).strict();
}

const statsLiteSchema = createValidatedSchema<StatBlockView>({
  HP: z.number(),
  attack: z.number(),
  defense: z.number(),
  speed: z.number(),
});

const pokemonTypeSchema = createValidatedSchema<PokemonType>({
  name: z.string(),
  image: z.string(),
});

const evolutionSchema = createValidatedSchema({
  name: z.string(),
  pokedexId: z.number(),
});

const pokemonLiteSchema = createValidatedSchema<PokemonView>({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  types: z.array(pokemonTypeSchema),
  stats: statsLiteSchema,
  evolvesFrom: evolutionSchema.nullable(),
});

export const isPokemonView = (data: unknown): data is PokemonView =>
  pokemonLiteSchema.safeParse(data).success;
