import { useState } from "react";
import { Pokemon } from "../lib/types";

export default function usePokemon() {
  const [typesCache, setTypesCache] = useState<string[] | null>(null);
  const [pokemonsCache, setPokemonsCache] = useState<Pokemon[] | null>(null);

  async function getPokemons() {
    if (pokemonsCache) return pokemonsCache;

    try {
      const response = await fetch("/api/get-pokemons", {});

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      const pokemons: Pokemon[] = data.pokemons;
      setPokemonsCache(pokemons);

      return pokemons;
    } catch (error) {
      console.error("Error in getPokemons:", error);
      return [];
    }
  }

  async function getTypes() {
    if (typesCache) return typesCache;

    try {
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
    } catch (error) {
      console.error("Error in getTypes:", error);
      return [];
    }
  }

  return { getPokemons, getTypes };
}
