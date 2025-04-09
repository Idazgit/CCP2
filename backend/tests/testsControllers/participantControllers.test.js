import { describe, it, expect, vi, beforeEach } from "vitest";
import { participantController } from "../../src/controllers/participantControllers.js";
import { participantServices } from "../../src/services/participantServices.js";

vi.mock("../../src/services/participantServices.js", () => ({
  participantServices: {
    getAllParticipants: vi.fn(),
    createParticipant: vi.fn(),
    getParticipantById: vi.fn(),
    updateParticipant: vi.fn(),
    deleteParticipant: vi.fn(),
  },
}));

describe("participantController", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    vi.clearAllMocks();
  });

  describe("getAllParticipants", () => {
    it("should return all participants", async () => {
      const mockParticipants = [
        { id: 1, name: "John", email: "john@mail.com" },
      ];
      participantServices.getAllParticipants.mockResolvedValue(
        mockParticipants
      );

      await participantController.getAllParticipants(mockReq, mockRes);

      expect(participantServices.getAllParticipants).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled(); // No explicit status set
      expect(mockRes.json).toHaveBeenCalledWith(mockParticipants);
    });

    it("should handle errors", async () => {
      participantServices.getAllParticipants.mockRejectedValue(
        new Error("DB error")
      );

      await participantController.getAllParticipants(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "DB error" });
    });
  });

  describe("createParticipant", () => {
    it("should create participant", async () => {
      mockReq.body = { name: "John", email: "john@mail.com" };
      const mockParticipant = { id: 1, name: "John", email: "john@mail.com" };
      participantServices.createParticipant.mockResolvedValue(mockParticipant);

      await participantController.createParticipant(mockReq, mockRes);

      expect(participantServices.createParticipant).toHaveBeenCalledWith(
        mockReq.body
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockParticipant);
    });

    it("should handle validation error", async () => {
      mockReq.body = { name: "", email: "wrong" };
      participantServices.createParticipant.mockRejectedValue(
        new Error("Invalid data")
      );

      await participantController.createParticipant(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "Invalid data" });
    });
  });

  describe("getParticipantById", () => {
    it("should return participant", async () => {
      mockReq.params = { id: "1" };
      const mockParticipant = { id: 1, name: "John" };
      participantServices.getParticipantById.mockResolvedValue(mockParticipant);

      await participantController.getParticipantById(mockReq, mockRes);

      expect(participantServices.getParticipantById).toHaveBeenCalledWith(
        mockReq.params.id
      );
      expect(mockRes.status).not.toHaveBeenCalled(); // No explicit status set
      expect(mockRes.json).toHaveBeenCalledWith(mockParticipant);
    });

    it("should handle not found", async () => {
      mockReq.params = { id: "99" };
      participantServices.getParticipantById.mockResolvedValue(null);

      await participantController.getParticipantById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Participant not found",
      });
    });
  });

  describe("deleteParticipant", () => {
    it("should delete participant", async () => {
      mockReq.params = { id: "1" };
      const mockResult = { changes: 1 };
      participantServices.deleteParticipant.mockResolvedValue(mockResult);

      await participantController.deleteParticipant(mockReq, mockRes);

      expect(participantServices.deleteParticipant).toHaveBeenCalledWith(
        mockReq.params.id
      );
      expect(mockRes.status).not.toHaveBeenCalled(); // No explicit status set
      expect(mockRes.json).toHaveBeenCalledWith(mockResult);
    });

    it("should handle not found on delete", async () => {
      mockReq.params = { id: "99" };
      const mockResult = { changes: 0 };
      participantServices.deleteParticipant.mockResolvedValue(mockResult);

      await participantController.deleteParticipant(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Participant not found",
      });
    });
  });
});
