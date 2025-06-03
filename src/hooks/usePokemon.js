import { useState } from "react";

export default function usePokemon() {
  const [typesCache, setTypesCache] = useState(null);
  const [pokemonsCache, setPokemonsCache] = useState(null);

  async function getPokemons() {
    if (pokemonsCache) return pokemonsCache;

    const response = await fetch("api/get-pokemons", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      const pokemons = data.pokemons.pokemons;
      setPokemonsCache(pokemons);

      return pokemons;
    }

    return console.error("Couldn't performe action");
  }

  async function getTypes() {
    if (typesCache) return typesCache;

    const response = await fetch("api/get-pokemon-types", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      const types = data.types.types;
      setTypesCache(types);

      return types;
    }

    return console.error("Couldn't performe action");
  }

  return { getPokemons, getTypes };
}
