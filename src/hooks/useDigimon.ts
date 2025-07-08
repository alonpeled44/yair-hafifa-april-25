import { useState } from "react";
import { Digimon } from "../lib/types";

export default function useDigimon() {
  const [typesCache, setTypesCache] = useState<string[] | null>(null);
  const [digimonsCache, setDigimonsCache] = useState<Digimon[] | null>(null);

  async function getDigimons() {
    if (digimonsCache) return digimonsCache;

    try {
      const response = await fetch("/api/get-digimons");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const digimons: Digimon[] = data.digimons;
      setDigimonsCache(digimons);

      return digimons;
    } catch (error) {
      console.error("Error in getDigimons:", error);
      return [];
    }
  }

  async function getTypes() {
    if (typesCache) return typesCache;

    const digimonTypes = [
      "Fresh",
      "In-Training",
      "Rookie",
      "Champion",
      "Ultimate",
      "Mega",
      "Child",
      "Adult",
      "Perfect",
      "Vaccine",
      "Data",
      "Virus",
      "Free",
      "Unknown",
      "Reptile",
      "Beast",
      "Bird",
      "Insect",
      "Machine",
      "Dragon",
      "Holy",
      "Dark",
      "Plant",
      "Aquatic",
    ];

    setTypesCache(digimonTypes);
    return digimonTypes;
  }

  return { getDigimons, getTypes };
}
