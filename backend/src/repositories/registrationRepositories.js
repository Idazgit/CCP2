import openDb from "../database/database.js";

export const registrationRepository = {
  async findAll() {
    const db = await openDb();
    return db.all("SELECT * FROM Registration");
  },

  async findById(participant_id, giveaway_id) {
    const db = await openDb();
    return db.get(
      "SELECT * FROM Registration WHERE participant_id = ? AND giveaway_id = ?",
      participant_id,
      giveaway_id
    );
  },

  async create(registration) {
    const db = await openDb();
    const result = await db.run(
      "INSERT INTO Registration (participant_id, giveaway_id) VALUES (?, ?)",
      registration.participant_id,
      registration.giveaway_id
    );
    return { id: result.lastID };
  },

  async delete(participant_id, giveaway_id) {
    const db = await openDb();
    const result = await db.run(
      "DELETE FROM Registration WHERE participant_id = ? AND giveaway_id = ?",
      participant_id,
      giveaway_id
    );
    return { changes: result.changes };
  },
};
