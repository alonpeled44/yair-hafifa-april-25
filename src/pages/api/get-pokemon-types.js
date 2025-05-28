export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const response = await fetch("https://pokeapi.co/api/v2/type");
    if (!response.ok)
      throw new Error(`Could not fetch pokemon with id: ${i + 1}`);

    const data = await response.json();
    const types = data.results.map((typeInfo) => typeInfo.name);

    return res.status(200).json({ types: { types } });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: { error } });
  }
}
