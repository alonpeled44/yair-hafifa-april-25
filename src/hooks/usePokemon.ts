import { useState } from "react";

export default function usePokemon() {
  const [typesCache, setTypesCache] = useState(null);
  const [pokemonsCache, setPokemonsCache] = useState(null);

  async function getPokemons() {
    if (pokemonsCache) return pokemonsCache;

    try {
      // Fixed: Changed endpoint to match your API file
      const response = await fetch("/api/get-pokemons", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data); // Debug log

      // Fixed: Changed from data.pokemons.pokemons to data.pokemons
      const pokemons = data.pokemons;
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
      // Return actual Digimon levels, attributes, and types based on the API structure
      const digimonTypes = [
        // Levels
        "Fresh",
        "In-Training",
        "Rookie",
        "Champion",
        "Ultimate",
        "Mega",
        "Child",
        "Adult",
        "Perfect",
        // Attributes
        "Vaccine",
        "Data",
        "Virus",
        "Free",
        "Unknown",
        // Common Types
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
