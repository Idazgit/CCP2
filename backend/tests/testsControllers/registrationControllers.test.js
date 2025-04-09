import { describe, it, expect, vi, beforeEach } from "vitest";
import { registrationController } from "../../src/controllers/registrationControllers.js";
import { registrationServices } from "../../src/services/registrationServices.js";

vi.mock("../../src/services/registrationServices.js", () => ({
  registrationServices: {
    getAllRegistrations: vi.fn(),
    getRegistrationById: vi.fn(),
    createRegistration: vi.fn(),
    deleteRegistration: vi.fn(),
  },
}));

describe("registrationController", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    vi.clearAllMocks();
  });

  describe("getAllRegistrations", () => {
    it("should return all registrations", async () => {
      const mockData = [{ participant_id: 1, giveaway_id: 2 }];
      registrationServices.getAllRegistrations.mockResolvedValue(mockData);

      await registrationController.getAllRegistrations(mockReq, mockRes);

      expect(registrationServices.getAllRegistrations).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(mockData);
    });

    it("should handle error", async () => {
      registrationServices.getAllRegistrations.mockRejectedValue(
        new Error("DB error")
      );

      await registrationController.getAllRegistrations(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "DB error" });
    });
  });

  describe("getRegistrationById", () => {
    it("should return registration", async () => {
      mockReq.params = { participant_id: "1", giveaway_id: "2" };
      const mockRegistration = { participant_id: 1, giveaway_id: 2 };

      registrationServices.getRegistrationById.mockResolvedValue(
        mockRegistration
      );

      await registrationController.getRegistrationById(mockReq, mockRes);

      expect(registrationServices.getRegistrationById).toHaveBeenCalledWith(
        1,
        2
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockRegistration);
    });

    it("should return 404 if not found", async () => {
      mockReq.params = { participant_id: "1", giveaway_id: "999" };
      registrationServices.getRegistrationById.mockResolvedValue(null);

      await registrationController.getRegistrationById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Registration not found",
      });
    });

    it("should handle error", async () => {
      mockReq.params = { participant_id: "1", giveaway_id: "2" };
      registrationServices.getRegistrationById.mockRejectedValue(
        new Error("Oops")
      );

      await registrationController.getRegistrationById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "Oops" });
    });
  });

  describe("createRegistration", () => {
    it("should create registration", async () => {
      mockReq.body = { participant_id: 1, giveaway_id: 2 };
      const mockResult = { success: true };

      registrationServices.createRegistration.mockResolvedValue(mockResult);

      await registrationController.createRegistration(mockReq, mockRes);

      expect(registrationServices.createRegistration).toHaveBeenCalledWith(
        mockReq.body
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockResult);
    });

    it("should handle unique constraint error", async () => {
      mockReq.body = { participant_id: 1, giveaway_id: 2 };

      registrationServices.createRegistration.mockRejectedValue(
        new Error(
          "SQLITE_CONSTRAINT: UNIQUE constraint failed: Registration.participant_id, Registration.giveaway_id"
        )
      );

      await registrationController.createRegistration(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Participant already registered to this giveaway",
      });
    });

    it("should handle validation error", async () => {
      mockReq.body = {};
      registrationServices.createRegistration.mockRejectedValue(
        new Error("Invalid")
      );

      await registrationController.createRegistration(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "Invalid" });
    });
  });

  describe("deleteRegistration", () => {
    it("should delete registration", async () => {
      mockReq.params = { participant_id: "1", giveaway_id: "2" };
      const mockResult = { changes: 1 };

      registrationServices.deleteRegistration.mockResolvedValue(mockResult);

      await registrationController.deleteRegistration(mockReq, mockRes);

      expect(registrationServices.deleteRegistration).toHaveBeenCalledWith(
        1,
        2
      );
      expect(mockRes.json).toHaveBeenCalledWith(mockResult);
    });

    it("should return 404 if not found", async () => {
      mockReq.params = { participant_id: "1", giveaway_id: "999" };
      const mockResult = { changes: 0 };

      registrationServices.deleteRegistration.mockResolvedValue(mockResult);

      await registrationController.deleteRegistration(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Registration not found",
      });
    });

    it("should handle error", async () => {
      mockReq.params = { participant_id: "1", giveaway_id: "2" };
      registrationServices.deleteRegistration.mockRejectedValue(
        new Error("Server fail")
      );

      await registrationController.deleteRegistration(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: "Server fail" });
    });
  });
});
