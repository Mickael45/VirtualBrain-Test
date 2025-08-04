import { useState } from "react";

export const useTypeSelection = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (typeName: string) =>
    setSelectedTypes((prevSelected) =>
      prevSelected.includes(typeName)
        ? prevSelected.filter((type) => type !== typeName)
        : [...prevSelected, typeName]
    );

  return {
    selectedTypes,
    toggleType,
  };
};
