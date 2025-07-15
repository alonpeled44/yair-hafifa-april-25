import sqlite3 from "sqlite3";
import { open } from "sqlite";

sqlite3.verbose();

export async function openDb() {
  return open({
    filename:
      "C:\\Users\\328100490\\Documents\\GitHub\\yair-hafifa-april-25\\db.db",
    driver: sqlite3.Database,
  });
}
