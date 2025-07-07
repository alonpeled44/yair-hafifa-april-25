import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/type");

    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon types");
    }

    const data = await response.json();
    const types: string[] = data.results.map((typeInfo: any) => typeInfo.name);

    return res.status(200).json({ types });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: (error as Error).message || "Something went wrong" });
  }
}
