import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    console.log("Fetching digimons from digi-api.com...");

    const individualPromises = [];

    for (let i = 1; i <= 100; i++) {
      individualPromises.push(
        fetch(`https://digi-api.com/api/v1/digimon/${i}`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return null;
          })
          .catch((error) => {
            console.log(`Failed to fetch digimon ${i}:`, error.message);
            return null;
          })
      );
    }

    console.log("Waiting for all digimon requests...");
    const responses = await Promise.all(individualPromises);
    const allDigimons = responses.filter((digimon) => digimon !== null);

    console.log(`Successfully fetched ${allDigimons.length} digimons`);

    if (allDigimons.length === 0) {
      console.log("No digimons fetched, using fallback data");
      // Use fallback data immediately if no digimons are fetched
      const fallbackDigimons = [
        {
          id: 1,
          name: "Agumon",
          types: ["Child", "Vaccine", "Reptile"],
          frontViewImageUrl: "https://digi-api.com/images/digimon/w/Agumon.png",
          backViewImageUrl: "https://digi-api.com/images/digimon/w/Agumon.png",
          frontShinyViewImageUrl:
            "https://digi-api.com/images/digimon/w/Agumon.png",
          backShinyViewImageUrl:
            "https://digi-api.com/images/digimon/w/Agumon.png",
          level: "Child",
          attribute: "Vaccine",
          digimonType: "Reptile",
        },
        {
          id: 2,
          name: "Gabumon",
          types: ["Child", "Data", "Beast"],
          frontViewImageUrl:
            "https://digi-api.com/images/digimon/w/Gabumon.png",
          backViewImageUrl: "https://digi-api.com/images/digimon/w/Gabumon.png",
          frontShinyViewImageUrl:
            "https://digi-api.com/images/digimon/w/Gabumon.png",
          backShinyViewImageUrl:
            "https://digi-api.com/images/digimon/w/Gabumon.png",
          level: "Child",
          attribute: "Data",
          digimonType: "Beast",
        },
      ];

      return res.status(200).json({ pokemons: fallbackDigimons });
    }

    // Transform digimon data to match your app's expected structure
    const pokemons = allDigimons
      .slice(0, 151) // Limit to 151 like original
      .map((digimon, index) => {
        console.log(`Processing digimon ${index + 1}:`, {
          name: digimon.name,
          levels: digimon.levels,
          attributes: digimon.attributes,
          types: digimon.types,
          images: digimon.images?.length || 0,
        });

        // Extract image URL from the correct structure
        let imageUrl = "";
        if (
          digimon.images &&
          Array.isArray(digimon.images) &&
          digimon.images.length > 0
        ) {
          imageUrl = digimon.images[0].href;
        } else {
          // Fallback image
          imageUrl = "https://via.placeholder.com/300x300?text=Digimon";
        }

        // Extract types from the API response structure - FIXED VERSION
        let types = [];

        // Add type (like "Reptile", "Beast", etc.)
        if (
          digimon.types &&
          Array.isArray(digimon.types) &&
          digimon.types.length > 0
        ) {
          console.log("Adding type:", digimon.types[0].type);
          types.push(digimon.types[0].type);
        }

        console.log("Final types array:", types);

        // Fallback if no types found
        if (types.length === 0) {
          types = ["unknown"];
        }

        return {
          id: index + 1, // Generate sequential IDs
          name: digimon.name || "Unknown Digimon",
          types: types,
          frontViewImageUrl: imageUrl,
          backViewImageUrl: imageUrl, // Use same image for back
          frontShinyViewImageUrl: imageUrl, // Use same image for shiny
          backShinyViewImageUrl: imageUrl, // Use same image for back shiny
          digimonId: digimon.id, // Keep original Digimon ID for reference
        };
      });

    console.log(`Processed ${pokemons.length} digimons for frontend`);

    return res.status(200).json({ pokemons });
  } catch (error) {
    console.error("Digimon API Error:", error);

    // Fallback: return some hardcoded digimons if API fails
    const fallbackDigimons = [
      {
        id: 1,
        name: "Agumon",
        types: ["Child", "Vaccine", "Reptile"],
        frontViewImageUrl: "https://digi-api.com/images/digimon/w/Agumon.png",
        backViewImageUrl: "https://digi-api.com/images/digimon/w/Agumon.png",
        frontShinyViewImageUrl:
          "https://digi-api.com/images/digimon/w/Agumon.png",
        backShinyViewImageUrl:
          "https://digi-api.com/images/digimon/w/Agumon.png",
        level: "Child",
        attribute: "Vaccine",
        digimonType: "Reptile",
      },
      {
        id: 2,
        name: "Gabumon",
        types: ["Child", "Data", "Beast"],
        frontViewImageUrl: "https://digi-api.com/images/digimon/w/Gabumon.png",
        backViewImageUrl: "https://digi-api.com/images/digimon/w/Gabumon.png",
        frontShinyViewImageUrl:
          "https://digi-api.com/images/digimon/w/Gabumon.png",
        backShinyViewImageUrl:
          "https://digi-api.com/images/digimon/w/Gabumon.png",
        level: "Child",
        attribute: "Data",
        digimonType: "Beast",
      },
    ];

    return res.status(200).json({ pokemons: fallbackDigimons });
  }
}
