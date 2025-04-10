import { describe, it, expect, vi, beforeEach } from "vitest";
import { winnerControllers } from "../../src/controllers/winnerControllers.js";
import { winnerServices } from "../../src/services/winnerServices.js";

// Mock des services
vi.mock("../../src/services/winnerServices.js", () => ({
  winnerServices: {
    getAllWinners: vi.fn(),
    getWinnerById: vi.fn(),
    createWinner: vi.fn(),
    deleteWinner: vi.fn(),
  },
}));

describe("winnerControllers", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    vi.clearAllMocks();
  });

  it("getAllWinners should return all winners", async () => {
    const winners = [
      { id: 1, participant_id: 101, giveaway_id: 202, prize_won: 500 },
    ];
    winnerServices.getAllWinners.mockResolvedValue(winners);

    await winnerControllers.getAllWinners(req, res);

    expect(winnerServices.getAllWinners).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(winners);
  });

  it("getWinnerById should return a winner if found", async () => {
    req.params = { participant_id: 101, giveaway_id: 202 };
    const winner = {
      id: 1,
      participant_id: 101,
      giveaway_id: 202,
      prize_won: 500,
    };
    winnerServices.getWinnerById.mockResolvedValue(winner);

    await winnerControllers.getWinnerById(req, res);

    expect(winnerServices.getWinnerById).toHaveBeenCalledWith(101, 202);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(winner);
  });

  it("getWinnerById should return 404 if winner not found", async () => {
    req.params = { participant_id: 101, giveaway_id: 202 };
    winnerServices.getWinnerById.mockResolvedValue(null);

    await winnerControllers.getWinnerById(req, res);

    expect(winnerServices.getWinnerById).toHaveBeenCalledWith(101, 202);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Winner not found" });
  });

  it("createWinner should create a new winner", async () => {
    req.body = { participant_id: 101, giveaway_id: 202, prize_won: 500 };
    const newWinner = { id: 1, ...req.body };
    winnerServices.createWinner.mockResolvedValue(newWinner);

    await winnerControllers.createWinner(req, res);

    expect(winnerServices.createWinner).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newWinner);
  });

  it("createWinner should return 400 if service throws an error", async () => {
    req.body = { participant_id: 101, giveaway_id: 202, prize_won: -100 };
    winnerServices.createWinner.mockRejectedValue(
      new Error("Prize must be a positive number")
    );

    await winnerControllers.createWinner(req, res);

    expect(winnerServices.createWinner).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Prize must be a positive number",
    });
  });

  it("deleteWinner should delete a winner if found", async () => {
    req.params = { participant_id: 101, giveaway_id: 202 };
    winnerServices.deleteWinner.mockResolvedValue({ changes: 1 });

    await winnerControllers.deleteWinner(req, res);

    expect(winnerServices.deleteWinner).toHaveBeenCalledWith(101, 202);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Winner deleted successfully",
    });
  });

  it("deleteWinner should return 404 if winner not found", async () => {
    req.params = { participant_id: 101, giveaway_id: 202 };
    winnerServices.deleteWinner.mockResolvedValue({ changes: 0 });

    await winnerControllers.deleteWinner(req, res);

    expect(winnerServices.deleteWinner).toHaveBeenCalledWith(101, 202);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Winner not found" });
  });
});
