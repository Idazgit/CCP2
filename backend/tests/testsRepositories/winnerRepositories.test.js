import { describe, it, expect, vi, beforeEach } from "vitest";
import { winnerRepository } from "../../src/repositories/winnerRepositories.js";
import openDb from "../../src/database/database.js";

// Mock de la base de données
vi.mock("../../src/database/database.js", () => ({
  default: vi.fn(),
}));

describe("winnerRepository", () => {
  let dbMock;

  beforeEach(() => {
    dbMock = {
      all: vi.fn(),
      get: vi.fn(),
      run: vi.fn(),
    };
    openDb.mockResolvedValue(dbMock);
    vi.clearAllMocks();
  });

  it("findAll should return all winners", async () => {
    dbMock.all.mockResolvedValue([
      { id: 1, participant_id: 101, giveaway_id: 202, prize_won: 500 },
    ]);
    const winners = await winnerRepository.findAll();
    expect(dbMock.all).toHaveBeenCalledWith("SELECT * FROM Winner");
    expect(winners).toEqual([
      { id: 1, participant_id: 101, giveaway_id: 202, prize_won: 500 },
    ]);
  });

  it("findById should return a specific winner", async () => {
    dbMock.get.mockResolvedValue({
      id: 1,
      participant_id: 101,
      giveaway_id: 202,
      prize_won: 500,
    });
    const winner = await winnerRepository.findById(101, 202);
    expect(dbMock.get).toHaveBeenCalledWith(
      "SELECT * FROM Winner WHERE participant_id = ? AND giveaway_id = ?",
      101,
      202
    );
    expect(winner).toEqual({
      id: 1,
      participant_id: 101,
      giveaway_id: 202,
      prize_won: 500,
    });
  });

  it("create should insert a new winner and return its ID", async () => {
    dbMock.run.mockResolvedValue({ lastID: 1 });
    const newWinner = { participant_id: 101, giveaway_id: 202, prize_won: 500 };
    const result = await winnerRepository.create(newWinner);
    expect(dbMock.run).toHaveBeenCalledWith(
      "INSERT INTO Winner (participant_id, giveaway_id, prize_won) VALUES (?, ?, ?)",
      newWinner.participant_id,
      newWinner.giveaway_id,
      newWinner.prize_won
    );
    expect(result).toEqual({ id: 1 });
  });

  it("delete should remove a winner and return the number of changes", async () => {
    dbMock.run.mockResolvedValue({ changes: 1 });
    const result = await winnerRepository.delete(101, 202);
    expect(dbMock.run).toHaveBeenCalledWith(
      "DELETE FROM Winner WHERE participant_id = ? AND giveaway_id = ?",
      101,
      202
    );
    expect(result).toEqual({ changes: 1 });
  });
});
