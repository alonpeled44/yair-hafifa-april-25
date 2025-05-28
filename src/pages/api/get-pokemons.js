export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const pokemonsAmount = 151;
  try {
    let pokemons = [];
    for (let i = 0; i < pokemonsAmount; i++) {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${i + 1}`
      );
      if (!response.ok) {
        throw new Error(`Could not fetch pokemon with id: ${i + 1}`);
      }
      const data = await response.json();

      const types = data.types.map((typeInfo) => typeInfo.type.name);

      pokemons[i] = {
        id: data.id,
        name: data.name,
        weight: data.weight,
        height: data.height,
        types: types,
        frontViewImageUrl: data.sprites.front_default,
        backViewImageUrl: data.sprites.back_default,
        frontShinyViewImageUrl: data.sprites.front_shiny,
        backShinyViewImageUrl: data.sprites.back_shiny,
      };
    }

    return res.status(200).json({ pokemons: { pokemons } });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: { error } });
  }
}
