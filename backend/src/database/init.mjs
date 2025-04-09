import sqlite3 from "sqlite3";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Permet de gérer les chemins en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ouvre la base
const dbPath = path.join(__dirname, "concours.sqlite");
const db = new sqlite3.Database(dbPath);

// Charge le contenu du fichier SQL
const sqlPath = path.join(__dirname, "dbCCP2.sql");
const sql = await readFile(sqlPath, "utf8");

// Exécute les instructions SQL
db.exec(sql, (err) => {
  if (err) {
    console.error("Erreur lors de l'initialisation de la base :", err.message);
  } else {
    console.log("Base de données initialisée avec succès ✅");
  }
  db.close();
});
