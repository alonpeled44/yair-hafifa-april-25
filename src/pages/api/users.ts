import type { NextApiRequest, NextApiResponse } from "next";
import { openDb } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await openDb();

  if (req.method !== "POST" && req.method !== "GET") {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } else if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    try {
      const user = await db.get(
        `
        SELECT username, password, theme, "font-size" AS fontSize FROM users WHERE username = ? AND password = ?
      `,
        [username, password]
      );

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.status(200).json(user);
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "GET") {
    try {
      const users = await db.all("SELECT * FROM users");
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }
}
