import { useState } from "react";
import { User } from "../lib/types";

export default function useUser() {
  async function setUser(changes: Record<string, any>) {
    const username = localStorage.getItem("username");
    if (!username) return;

    try {
      await fetch("/api/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, ...changes }),
      });
    } catch (err) {
      console.error("Failed to update user preferences", err);
    }
  }

  async function getUsers(): Promise<User[]> {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data: User[] = await res.json();

      return data;
    } catch (error) {
      console.error("error in getUsers: " + error);
      return [];
    }
  }

  async function getUser(username: string, password: string) {
    const users = await getUsers();

    return (
      users.find((u) => u.username === username && u.password === password) ||
      null
    );
  }
  return { getUser, setUser };
}
