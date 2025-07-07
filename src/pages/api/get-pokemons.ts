import type { NextApiRequest, NextApiResponse } from "next";

type DigimonBasic = {
  id: number;
  name: string;
};

type DigimonDetailed = {
  id: number;
  name: string;
  images: { href: string }[];
  types: { type: string }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const listResponse = await fetch(
      "https://digi-api.com/api/v1/digimon?pageSize=100"
    );
    const listData = await listResponse.json();

    const digimonList: DigimonBasic[] = listData.content as DigimonBasic[];

    const detailPromises = digimonList.map((digimon) =>
      fetch(`https://digi-api.com/api/v1/digimon/${digimon.id}`)
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null)
    );

    const detailedDigimons = await Promise.all(detailPromises);
    const validDigimons = detailedDigimons.filter(Boolean) as DigimonDetailed[];

    const digimons = validDigimons.map((digimon, index) => {
      const imageUrl =
        digimon.images?.[0]?.href ||
        "https://via.placeholder.com/300x300?text=Digimon";

      const types =
        Array.isArray(digimon.types) && digimon.types.length > 0
          ? digimon.types.map((t) => t.type)
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

    return res.status(200).json({ pokemons: digimons });
  } catch (error) {
    return console.error(error);
  }
}
