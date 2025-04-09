import { describe, it, expect, vi, beforeEach } from "vitest";
import { giveawayController } from "../../src/controllers/giveawayControllers.js";
import { giveawayServices } from "../../src/services/giveawayServices.js";

vi.mock("../../src/services/giveawayServices.js", () => ({
  giveawayServices: {
    getAllGiveaways: vi.fn(),
    createGiveaway: vi.fn(),
    getGiveawayById: vi.fn(),
    updateGiveaway: vi.fn(),
    deleteGiveaway: vi.fn(),
  },
}));

describe("giveawayController", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    vi.clearAllMocks();
  });

  describe("getAllGiveaways", () => {
    it("should return all giveaways", async () => {
      const mockGiveaways = [
        {
          id: 1,
          name: "Summer Giveaway",
          prize: 1000,
          draw_date: "2025-12-31",
        },
      ];
      giveawayServices.getAllGiveaways.mockResolvedValue(mockGiveaways);

      await giveawayController.getAllGiveaways(mockReq, mockRes);

      expect(giveawayServices.getAllGiveaways).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled(); // No explicit status set
      expect(mockRes.json).toHaveBeenCalledWith(mockGiveaways);
    });

    it("should handle errors", async () => {
      giveawayServices.getAllGiveaways.mockRejectedValue(new Error("DB error"));

      await giveawayController.getAllGiveaways(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "DB error" });
    });
  });

  describe("createGiveaway", () => {
    it("should create a giveaway", async () => {
      mockReq.body = {
        name: "Spring Giveaway",
        prize: 2000,
        draw_date: "2025-10-15",
      };
      const mockGiveaway = {
        id: 1,
        name: "Spring Giveaway",
        prize: 2000,
        draw_date: "2025-10-15",
      };
      giveawayServices.createGiveaway.mockResolvedValue(mockGiveaway);

      await giveawayController.createGiveaway(mockReq, mockRes);

      expect(giveawayServices.createGiveaway).toHaveBeenCalledWith(
        mockReq.body
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockGiveaway);
    });

    it("should handle validation errors", async () => {
      mockReq.body = { name: "", prize: -100, draw_date: "invalid" };
      giveawayServices.createGiveaway.mockRejectedValue(
        new Error("Invalid data")
      );

      await giveawayController.createGiveaway(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "Invalid data" });
    });
  });

  describe("getGiveawayById", () => {
    it("should return a giveaway", async () => {
      mockReq.params = { id: "1" };
      const mockGiveaway = {
        id: 1,
        name: "Summer Giveaway",
        prize: 1000,
        draw_date: "2025-12-31",
      };
      giveawayServices.getGiveawayById.mockResolvedValue(mockGiveaway);

      await giveawayController.getGiveawayById(mockReq, mockRes);

      expect(giveawayServices.getGiveawayById).toHaveBeenCalledWith(
        mockReq.params.id
      );
      expect(mockRes.status).not.toHaveBeenCalled(); // No explicit status set
      expect(mockRes.json).toHaveBeenCalledWith(mockGiveaway);
    });

    it("should handle not found", async () => {
      mockReq.params = { id: "99" };
      giveawayServices.getGiveawayById.mockResolvedValue(null);

      await giveawayController.getGiveawayById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Giveaway not found",
      });
    });
  });

  describe("deleteGiveaway", () => {
    it("should delete a giveaway", async () => {
      mockReq.params = { id: "1" };
      const mockResult = { changes: 1 };
      giveawayServices.deleteGiveaway.mockResolvedValue(mockResult);

      await giveawayController.deleteGiveaway(mockReq, mockRes);

      expect(giveawayServices.deleteGiveaway).toHaveBeenCalledWith(
        mockReq.params.id
      );
      expect(mockRes.status).not.toHaveBeenCalled(); // No explicit status set
      expect(mockRes.json).toHaveBeenCalledWith(mockResult);
    });

    it("should handle not found on delete", async () => {
      mockReq.params = { id: "99" };
      const mockResult = { changes: 0 };
      giveawayServices.deleteGiveaway.mockResolvedValue(mockResult);

      await giveawayController.deleteGiveaway(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Giveaway not found",
      });
    });
  });
});
