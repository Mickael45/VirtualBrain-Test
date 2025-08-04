import { Pokemon, Resistance } from "types";

const formatItem = (title: string, value: string | number): string =>
  `- **${title}**${value ? ": " + value : ""}`;

const addNone = (): string => "- **None**";

const addSection = (title: string, content: string[]): string[] => {
  const parts = [`## ${title}`];

  parts.push(...content);
  parts.push("\n---");

  return parts;
};

const formatBasicInfo = ({
  pokedexId,
  id,
  slug,
  apiGeneration,
}: Pokemon): string[] => [
  formatItem("Pokedex ID", pokedexId),
  formatItem("Pokemon ID", id),
  formatItem("Slug", slug),
  formatItem("Generation", apiGeneration),
];

const formatStats = ({
  HP,
  attack,
  defense,
  special_attack,
  special_defense,
  speed,
}: Pokemon["stats"]): string[] => [
  formatItem("HP", HP),
  formatItem("Attack", attack),
  formatItem("Defense", defense),
  formatItem("Special Attack", special_attack),
  formatItem("Special Defense", special_defense),
  formatItem("Speed", speed),
];

const formatTypes = (types: Pokemon["apiTypes"]): string[] =>
  types.map((type) => formatItem(type.name, ""));

const formatResistances = (resistances: Resistance[]): string[] =>
  resistances.length === 0
    ? [addNone()]
    : resistances.map(({ name, damage_multiplier, damage_relation }) =>
        formatItem(name, `${damage_relation} (${damage_multiplier})`)
      );

const formatResistanceModifyingAbilities = (
  abilities: Pokemon["resistanceModifyingAbilitiesForApi"]
): string[] => {
  const isArray = Array.isArray(abilities);

  if (
    abilities === null ||
    abilities === undefined ||
    (isArray && abilities.length === 0)
  ) {
    return [addNone()];
  }

  return isArray
    ? abilities.map(({ name, slug }) => formatItem(name, slug))
    : [formatItem(abilities.name, "")];
};

const formatEvolutions = (evolutions: Pokemon["apiEvolutions"]): string[] =>
  evolutions.length === 0
    ? [addNone()]
    : evolutions.map(({ name, pokedexId }) =>
        formatItem(name, `(ID: ${pokedexId})`)
      );

const formatPreEvolution = (
  preEvolution: Pokemon["apiPreEvolution"]
): string[] =>
  preEvolution === "none"
    ? [addNone()]
    : [formatItem(preEvolution.name, `(ID: ${preEvolution.pokedexIdd})`)];

export const pokemonJsonToMd = (data: Pokemon): string => {
  const mdStrings: string[] = [];

  mdStrings.push(`# Pokemon Name: ${data.name}\n`);

  mdStrings.push(...addSection("Basic Info", formatBasicInfo(data)));
  mdStrings.push(...addSection("Stats", formatStats(data.stats)));
  mdStrings.push(...addSection("Types", formatTypes(data.apiTypes)));
  mdStrings.push(
    ...addSection("Resistances", formatResistances(data.apiResistances))
  );
  mdStrings.push(
    ...addSection(
      "Resistance With Abilities",
      formatResistances(data.apiResistancesWithAbilities)
    )
  );
  mdStrings.push(
    ...addSection(
      "Resistance Modifying Abilities",
      formatResistanceModifyingAbilities(
        data.resistanceModifyingAbilitiesForApi
      )
    )
  );
  mdStrings.push(
    ...addSection("Pre Evolution", formatPreEvolution(data.apiPreEvolution))
  );
  mdStrings.push(
    ...addSection("Evolutions", formatEvolutions(data.apiEvolutions))
  );

  return mdStrings.join("\n");
};
