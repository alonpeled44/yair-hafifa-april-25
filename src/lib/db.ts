import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

sqlite3.verbose();

export async function openDb() {
  return open({
    filename: path.join(process.cwd(), "db.db"),
    driver: sqlite3.Database,
  });
}
