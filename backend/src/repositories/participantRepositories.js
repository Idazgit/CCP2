import openDb from "../database/database.js";

export const participantRepository = {
  async findAll() {
    const db = await openDb();
    const participants = await db.all("SELECT * FROM Participant");
    return participants;
  },

  async findById(id) {
    const db = await openDb();
    const participant = await db.get(
      "SELECT * FROM Participant WHERE participant_id = ?",
      id
    );
    return participant;
  },

  async findByEmail(email) {
    const db = await openDb();
    const participant = await db.get(
      "SELECT * FROM Participant WHERE email = ?",
      email
    );
    return participant;
  },

  async create(participant) {
    const db = await openDb();
    const result = await db.run(
      "INSERT INTO Participant (name, email, password) VALUES (?, ?, ?)",
      participant.name,
      participant.email,
      participant.password
    );
    return {
      id: result.lastID,
    };
  },

  async update(participant) {
    const db = await openDb();
    const result = await db.run(
      "UPDATE Participant SET name = ?, email = ?, password = ? WHERE participant_id = ?",
      participant.name,
      participant.email,
      participant.password,
      participant.id
    );
    return {
      changes: result.changes,
    };
  },

  async delete(id) {
    const db = await openDb();
    const result = await db.run(
      "DELETE FROM Participant WHERE participant_id = ?",
      id
    );
    return {
      changes: result.changes,
    };
  },
};
