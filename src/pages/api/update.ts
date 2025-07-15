import type { NextApiRequest, NextApiResponse } from "next";
import { openDb } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await openDb();

  if (req.method === "PUT") {
    const { username, theme, fontSize } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    try {
      const updates: string[] = [];
      const params: any[] = [];

      if (theme) {
        updates.push(`theme = ?`);
        params.push(theme);
      }
      if (fontSize) {
        updates.push(`"font-size" = ?`);
        params.push(fontSize);
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      params.push(username);

      const sql = `UPDATE users SET ${updates.join(", ")} WHERE username = ?`;

      await db.run(sql, params);

      return res.status(200).json({ message: "User preferences updated" });
    } catch (error) {
      console.error("Failed to update user preferences:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
