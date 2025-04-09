import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

// Résout le chemin réel du fichier courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Recrée un chemin absolu vers le fichier DB
const dbPath = path.resolve(__dirname, "concours.sqlite");

export default async function openDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}
