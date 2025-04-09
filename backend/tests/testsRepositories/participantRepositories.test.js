import { describe, it, expect, vi, beforeEach } from "vitest";

import { participantRepository } from "../../src/repositories/participantRepositories.js";
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
    { id: 1, name: "Jean", email: "jean@mail.com" },
    { id: 2, name: "Claire", email: "claire@mail.com" },
  ]);

  mockGet = vi.fn().mockResolvedValue({
    id: 1,
    name: "Jean",
    email: "jean@mail.com",
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

describe("participantRepository", () => {
  it("findAll should return all participants", async () => {
    const participants = await participantRepository.findAll();
    expect(mockAll).toHaveBeenCalled();
    expect(participants).toHaveLength(2);
  });

  it("create should insert a participant and return id", async () => {
    const newParticipant = { name: "Luc", email: "luc@mail.com" };
    const result = await participantRepository.create(newParticipant);
    expect(mockRun).toHaveBeenCalledWith(
      "INSERT INTO Participant (name, email) VALUES (?, ?)",
      newParticipant.name,
      newParticipant.email
    );
    expect(result).toEqual({ id: 1 });
  });

  it("findById should return a participant when found", async () => {
    const result = await participantRepository.findById(1);
    expect(mockGet).toHaveBeenCalledWith(
      "SELECT * FROM Participant WHERE participant_id = ?",
      1
    );
    expect(result).toEqual({
      id: 1,
      name: "Jean",
      email: "jean@mail.com",
    });
  });

  it("findById should return null when not found", async () => {
    mockGet.mockResolvedValue(null);
    const result = await participantRepository.findById(999);
    expect(result).toBeNull();
  });

  it("update should update a participant and return changes", async () => {
    const participant = { id: 1, name: "Paul", email: "paul@mail.com" };
    const result = await participantRepository.update(participant);
    expect(mockRun).toHaveBeenCalledWith(
      "UPDATE Participant SET name = ?, email = ? WHERE participant_id = ?",
      participant.name,
      participant.email,
      participant.id
    );
    expect(result).toEqual({ changes: 1 });
  });

  it("delete should remove a participant and return changes", async () => {
    const result = await participantRepository.delete(1);
    expect(mockRun).toHaveBeenCalledWith(
      "DELETE FROM Participant WHERE participant_id = ?",
      1
    );
    expect(result).toEqual({ changes: 1 });
  });
});
