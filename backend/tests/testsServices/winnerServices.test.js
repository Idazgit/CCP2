import { describe, it, expect, vi, beforeEach } from "vitest";
import { winnerServices } from "../../src/services/winnerServices.js";
import { winnerRepository } from "../../src/repositories/winnerRepositories.js";

// Mock du repository
vi.mock("../../src/repositories/winnerRepositories.js", () => ({
  winnerRepository: {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("winnerServices", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("createWinner should call repository when valid", async () => {
    const winnerData = { participant_id: 1, giveaway_id: 2, prize_won: 500 };
    await winnerServices.createWinner(winnerData);
    expect(winnerRepository.create).toHaveBeenCalled();
  });

  it("createWinner should throw if missing participant_id", async () => {
    const winnerData = { giveaway_id: 2, prize_won: 500 };
    await expect(winnerServices.createWinner(winnerData)).rejects.toThrow(
      "Participant ID is required"
    );
  });

  it("createWinner should throw if missing giveaway_id", async () => {
    const winnerData = { participant_id: 1, prize_won: 500 };
    await expect(winnerServices.createWinner(winnerData)).rejects.toThrow(
      "Giveaway ID is required"
    );
  });

  it("createWinner should throw if prize_won is invalid", async () => {
    const winnerData = { participant_id: 1, giveaway_id: 2, prize_won: -100 };
    await expect(winnerServices.createWinner(winnerData)).rejects.toThrow(
      "Prize must be a positive number"
    );
  });

  it("createWinner should throw if winner already exists", async () => {
    const winnerData = { participant_id: 1, giveaway_id: 2, prize_won: 500 };

    winnerRepository.findById.mockResolvedValue({
      participant_id: 1,
      giveaway_id: 2,
    });

    await expect(winnerServices.createWinner(winnerData)).rejects.toThrow(
      "Winner already exists"
    );

    expect(winnerRepository.findById).toHaveBeenCalledWith(1, 2);
    expect(winnerRepository.create).not.toHaveBeenCalled();
  });

  it("getAllWinners should call repository", () => {
    winnerServices.getAllWinners();
    expect(winnerRepository.findAll).toHaveBeenCalled();
  });

  it("getWinnerById should call repository with correct params", () => {
    winnerServices.getWinnerById(1, 2);
    expect(winnerRepository.findById).toHaveBeenCalledWith(1, 2);
  });

  it("deleteWinner should call repository with correct params", () => {
    winnerServices.deleteWinner(1, 2);
    expect(winnerRepository.delete).toHaveBeenCalledWith(1, 2);
  });
});
