import openDb from "../database/database.js";

export const winnerRepository = {
  async findAll() {
    const db = await openDb();
    return db.all("SELECT * FROM Winner");
  },

  async findById(participant_id, giveaway_id) {
    const db = await openDb();
    return db.get(
      "SELECT * FROM Winner WHERE participant_id = ? AND giveaway_id = ?",
      participant_id,
      giveaway_id
    );
  },

  async create(winner) {
    const db = await openDb();
    const result = await db.run(
      "INSERT INTO Winner (participant_id, giveaway_id, prize_won) VALUES (?, ?, ?)",
      winner.participant_id,
      winner.giveaway_id,
      winner.prize_won
    );
    return { id: result.lastID };
  },

  async delete(participant_id, giveaway_id) {
    const db = await openDb();
    const result = await db.run(
      "DELETE FROM Winner WHERE participant_id = ? AND giveaway_id = ?",
      participant_id,
      giveaway_id
    );
    return { changes: result.changes };
  },
};
