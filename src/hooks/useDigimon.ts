import { useState } from "react";
import { digimon } from "../lib/types";

export default function usedigimon() {
  const [typesCache, setTypesCache] = useState<string[] | null>(null);
  const [digimonsCache, setdigimonsCache] = useState<digimon[] | null>(null);

  async function getdigimons() {
    if (digimonsCache) return digimonsCache;

    try {
      const response = await fetch("/api/get-digimons", {});

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const digimons: digimon[] = data.digimons;
      setdigimonsCache(digimons);

      return digimons;
    } catch (error) {
      console.error("Error in getdigimons:", error);
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

  return { getdigimons, getTypes };
}
