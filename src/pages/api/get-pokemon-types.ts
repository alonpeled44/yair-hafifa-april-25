export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const response = await fetch("https://pokeapi.co/api/v2/type");

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon types`);
    }

    const data = await response.json();
    const types = data.results.map((typeInfo) => typeInfo.name);

    return res.status(200).json({ types });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Something went wrong" });
  }
}
