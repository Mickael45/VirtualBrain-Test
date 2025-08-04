const classicTypeColorMap: Record<string, string> = {
  plante: "bg-[#A8A77A]",
  feu: "bg-[#EE8130]",
  eau: "bg-[#6390F0]",
  insecte: "bg-[#A6B91A]",
  normal: "bg-[#A8A77A]",
  poison: "bg-[#A33EA1]",
  électrik: "bg-[#F7D02C]",
  sol: "bg-[#E2BF65]",
  fée: "bg-[#D685AD]",
  combat: "bg-[#C22E28]",
  psy: "bg-[#F95587]",
  roche: "bg-[#B6A136]",
  spectre: "bg-[#735797]",
  glace: "bg-[#96D9D6]",
  dragon: "bg-[#6F35FC]",
  ténèbres: "bg-[#705746]",
  acier: "bg-[#B7B7CE]",
  vol: "bg-[#A98FF3]",
};

export const typeToColorMapper = (typeName: string): string =>
  classicTypeColorMap[typeName.toLowerCase()] || "bg-gray-500";
