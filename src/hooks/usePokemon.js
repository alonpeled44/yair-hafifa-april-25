export default function usePokemon() {
  async function getPokemons() {
    const response = await fetch("api/get-pokemons", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      return data.pokemons.pokemons;
    }

    return console.error("Couldn't performe action");
  }

  async function getTypes() {
    const response = await fetch("api/get-pokemon-types", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      return data.types.types;
    }

    return console.error("Couldn't performe action");
  }

  return { getPokemons, getTypes };
}
