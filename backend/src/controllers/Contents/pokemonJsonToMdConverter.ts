import { Ability, Pokemon } from "../../types/Pokemon";

export const pokemonJsonToMd = (data: Pokemon): string => {
  const mdStrings: string[] = [];

  mdStrings.push(`# Pokemon Name: ${data.name}/n`);

  mdStrings.push(`## Basic Info`);
  mdStrings.push(`- **Pokedex ID:** ${data.pokedexId}`);
  mdStrings.push(`- **Name:** ${data.name}`);
  mdStrings.push(
    `- **Type:** ${data.apiTypes.map((type) => type.name).join(", ")}`
  );
  mdStrings.push(`- **Generation:** ${data.apiGeneration}`);
  mdStrings.push("\n---");

  mdStrings.push(`## Stats`);
  mdStrings.push(`- **HP:** ${data.stats.HP}`);
  mdStrings.push(`- **Attack:** ${data.stats.attack}`);
  mdStrings.push(`- **Defense:** ${data.stats.defense}`);
  mdStrings.push(`- **Special Attack:** ${data.stats.special_attack}`);
  mdStrings.push(`- **Special Defense:** ${data.stats.special_defense}`);
  mdStrings.push(`- **Speed:** ${data.stats.speed}`);
  mdStrings.push("\n---");

  mdStrings.push("## Types");
  data.apiTypes.forEach((type) => {
    mdStrings.push(`- **${type.name}** ![${type.name}])`);
  });
  mdStrings.push("\n---");

  mdStrings.push(`## Resistances`);
  data.apiResistances.length === 0
    ? ["- **None**"]
    : data.apiResistances.map(
        ({ name, damage_multiplier, damage_relation }) =>
          `- **${name}:** ${damage_relation} (${damage_multiplier})`
      );
  mdStrings.push("\n---");

  mdStrings.push(`## Resistance With Abilities`);
  data.apiResistancesWithAbilities.length === 0
    ? ["- **None**"]
    : data.apiResistancesWithAbilities.map(
        ({ name, damage_multiplier, damage_relation }) =>
          `- **${name}:** ${damage_relation} (${damage_multiplier})`
      );
  mdStrings.push("\n---");

  mdStrings.push(`## Resistance Modifying Abilities`);
  const isArray = Array.isArray(data.resistanceModifyingAbilitiesForApi);

  if (
    data.resistanceModifyingAbilitiesForApi === null ||
    data.resistanceModifyingAbilitiesForApi === undefined ||
    (isArray &&
      (data.resistanceModifyingAbilitiesForApi as unknown as Array<Ability>)
        .length === 0)
  ) {
    mdStrings.push("- **None**");
  } else if (isArray) {
    (
      data.resistanceModifyingAbilitiesForApi as unknown as Array<Ability>
    ).forEach(({ name, slug }) => {
      mdStrings.push(`- **${name}** (${slug})`);
    });
  } else {
    mdStrings.push(
      `- **${
        (data.resistanceModifyingAbilitiesForApi as unknown as Ability).name
      }** (${
        (data.resistanceModifyingAbilitiesForApi as unknown as Ability).slug
      })`
    );
  }

  mdStrings.push(`## Pre Evolution`);
  if (data.apiPreEvolution === "none") {
    mdStrings.push("- **None**");
  } else {
    mdStrings.push(
      `- **${data.apiPreEvolution.name}** (ID: ${data.apiPreEvolution.pokedexIdd})`
    );
  }
  mdStrings.push("\n---");

  mdStrings.push(`## Evolutions`);
  if (data.apiEvolutions.length === 0) {
    mdStrings.push("- **None**");
  } else {
    data.apiEvolutions.forEach(({ name, pokedexId }) => {
      mdStrings.push(`- **${name}** (Pokemon id: ${pokedexId})
`);
    });
  }

  return mdStrings.join("\n");
};
