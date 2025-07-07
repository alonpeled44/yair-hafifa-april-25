import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const individualPromises = [];

    for (let i = 1; i <= 100; i++) {
      individualPromises.push(
        fetch(`https://digi-api.com/api/v1/digimon/${i}`)
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => null)
      );
    }

    const responses = await Promise.all(individualPromises);
    const allDigimons = responses.filter((digimon) => digimon !== null);

    const pokemons = allDigimons.map((digimon, index) => {
      const imageUrl =
        digimon.images?.[0]?.href ||
        "https://via.placeholder.com/300x300?text=Digimon";

      const types =
        Array.isArray(digimon.types) && digimon.types.length > 0
          ? digimon.types.map((t: { type: string }) => t.type)
          : ["unknown"];

      return {
        id: index + 1,
        name: digimon.name,
        types: types,
        frontViewImageUrl: imageUrl,
        backViewImageUrl: imageUrl,
        frontShinyViewImageUrl: imageUrl,
        backShinyViewImageUrl: imageUrl,
        digimonId: digimon.id,
      };
    });

    return res.status(200).json({ pokemons });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch digimons." });
  }
}
