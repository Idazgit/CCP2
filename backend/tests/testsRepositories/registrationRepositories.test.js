import { describe, it, expect, vi, beforeEach } from "vitest";
import { registrationRepository } from "../../src/repositories/registrationRepositories.js";
import openDb from "../../src/database/database.js";

// Mock du module database
vi.mock("../../src/database/database.js", () => ({
  default: vi.fn(),
}));

let mockAll, mockGet, mockRun;

beforeEach(() => {
  mockAll = vi
    .fn()
    .mockResolvedValue([
      { participant_id: 1, giveaway_id: 2, registration_date: "2025-04-09" },
    ]);
  mockGet = vi.fn().mockResolvedValue({
    participant_id: 1,
    giveaway_id: 2,
    registration_date: "2025-04-09",
  });
  mockRun = vi.fn().mockResolvedValue({ lastID: 1, changes: 1 });

  openDb.mockResolvedValue({
    all: mockAll,
    get: mockGet,
    run: mockRun,
  });
});

describe("registrationRepository", () => {
  it("findAll should return all registrations", async () => {
    const registrations = await registrationRepository.findAll();
    expect(mockAll).toHaveBeenCalledWith("SELECT * FROM Registration");
    expect(registrations).toEqual([
      { participant_id: 1, giveaway_id: 2, registration_date: "2025-04-09" },
    ]);
  });

  it("findById should return a specific registration", async () => {
    const registration = await registrationRepository.findById(1, 2);
    expect(mockGet).toHaveBeenCalledWith(
      "SELECT * FROM Registration WHERE participant_id = ? AND giveaway_id = ?",
      1,
      2
    );
    expect(registration).toEqual({
      participant_id: 1,
      giveaway_id: 2,
      registration_date: "2025-04-09",
    });
  });

  it("create should insert a new registration and return the ID", async () => {
    const newRegistration = {
      participant_id: 1,
      giveaway_id: 2,
    };
    const result = await registrationRepository.create(newRegistration);
    expect(mockRun).toHaveBeenCalledWith(
      "INSERT INTO Registration (participant_id, giveaway_id) VALUES (?, ?)",
      newRegistration.participant_id,
      newRegistration.giveaway_id
    );
    expect(result).toEqual({ id: 1 });
  });

  it("delete should remove a registration and return changes", async () => {
    const result = await registrationRepository.delete(1, 2);
    expect(mockRun).toHaveBeenCalledWith(
      "DELETE FROM Registration WHERE participant_id = ? AND giveaway_id = ?",
      1,
      2
    );
    expect(result).toEqual({ changes: 1 });
  });
});
