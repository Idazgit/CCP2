import { describe, it, expect, vi, beforeEach } from "vitest";

import { giveawayRepository } from "../../src/repositories/giveawayRepositories.js";
import openDb from "../../src/database/database.js";

// Crée les variables à mocker
let mockAll;
let mockRun;
let mockGet;

// Mock du module database
vi.mock("../../src/database/database.js", () => ({
  default: vi.fn(),
}));

beforeEach(() => {
  // Réinitialise les fonctions mockées à chaque test
  mockAll = vi.fn().mockResolvedValue([
    { id: 1, name: "Summer Giveaway", prize: 1000, draw_date: "2025-12-31" },
    { id: 2, name: "Winter Giveaway", prize: 500, draw_date: "2025-11-30" },
  ]);

  mockGet = vi.fn().mockResolvedValue({
    id: 1,
    name: "Summer Giveaway",
    prize: 1000,
    draw_date: "2025-12-31",
  });

  mockRun = vi.fn().mockResolvedValue({
    lastID: 1,
    changes: 1,
  });

  // On réassocie le mock d’openDb à chaque fois
  openDb.mockResolvedValue({
    all: mockAll,
    get: mockGet,
    run: mockRun,
  });
});

describe("giveawayRepository", () => {
  it("findAll should return all giveaways", async () => {
    const giveaways = await giveawayRepository.findAll();
    expect(mockAll).toHaveBeenCalled();
    expect(giveaways).toHaveLength(2);
  });

  it("create should insert a giveaway and return id", async () => {
    const newGiveaway = {
      name: "Spring Giveaway",
      prize: 2000,
      draw_date: "2025-10-15",
    };
    const result = await giveawayRepository.create(newGiveaway);
    expect(mockRun).toHaveBeenCalledWith(
      "INSERT INTO Giveaway (name, prize, draw_date) VALUES (?, ?, ?)",
      newGiveaway.name,
      newGiveaway.prize,
      newGiveaway.draw_date
    );
    expect(result).toEqual({ id: 1 });
  });

  it("findById should return a giveaway when found", async () => {
    const result = await giveawayRepository.findById(1);
    expect(mockGet).toHaveBeenCalledWith(
      "SELECT * FROM Giveaway WHERE giveaway_id = ?",
      1
    );
    expect(result).toEqual({
      id: 1,
      name: "Summer Giveaway",
      prize: 1000,
      draw_date: "2025-12-31",
    });
  });

  it("findById should return null when not found", async () => {
    mockGet.mockResolvedValue(null);
    const result = await giveawayRepository.findById(999);
    expect(result).toBeNull();
  });

  it("update should update a giveaway and return changes", async () => {
    const giveaway = {
      id: 1,
      name: "Updated Giveaway",
      prize: 1500,
      draw_date: "2025-12-25",
    };
    const result = await giveawayRepository.update(giveaway);
    expect(mockRun).toHaveBeenCalledWith(
      "UPDATE Giveaway SET name = ?, prize = ?, draw_date = ? WHERE giveaway_id = ?",
      giveaway.name,
      giveaway.prize,
      giveaway.draw_date,
      giveaway.id
    );
    expect(result).toEqual({ changes: 1 });
  });

  it("delete should remove a giveaway and return changes", async () => {
    const result = await giveawayRepository.delete(1);
    expect(mockRun).toHaveBeenCalledWith(
      "DELETE FROM Giveaway WHERE giveaway_id = ?",
      1
    );
    expect(result).toEqual({ changes: 1 });
  });
});
