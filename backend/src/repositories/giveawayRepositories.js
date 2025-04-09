import openDb from "../database/database.js";

export const giveawayRepository = {
  async findAll() {
    const db = await openDb();
    return db.all("SELECT * FROM Giveaway");
  },

  async findById(id) {
    const db = await openDb();
    return db.get("SELECT * FROM Giveaway WHERE giveaway_id = ?", id);
  },

  async create(giveaway) {
    const db = await openDb();
    const result = await db.run(
      "INSERT INTO Giveaway (name, prize, draw_date) VALUES (?, ?, ?)",
      giveaway.name,
      giveaway.prize,
      giveaway.draw_date
    );
    return { id: result.lastID };
  },

  async update(giveaway) {
    const db = await openDb();
    const result = await db.run(
      "UPDATE Giveaway SET name = ?, prize = ?, draw_date = ? WHERE giveaway_id = ?",
      giveaway.name,
      giveaway.prize,
      giveaway.draw_date,
      giveaway.id
    );
    return { changes: result.changes };
  },

  async delete(id) {
    const db = await openDb();
    const result = await db.run(
      "DELETE FROM Giveaway WHERE giveaway_id = ?",
      id
    );
    return { changes: result.changes };
  },
};
