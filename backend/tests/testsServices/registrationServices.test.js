import { describe, it, expect, vi, beforeEach } from "vitest";
import { registrationServices } from "../../src/services/registrationServices.js";
import { registrationRepository } from "../../src/repositories/registrationRepositories.js";

// Mock du repository
vi.mock("../../src/repositories/registrationRepositories.js", () => ({
  registrationRepository: {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("registrationServices", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("createRegistration should call repository when valid", async () => {
    const registrationData = { participant_id: 1, giveaway_id: 2 };
    await registrationServices.createRegistration(registrationData);
    expect(registrationRepository.create).toHaveBeenCalled();
  });

  it("createRegistration should throw if missing participant_id", async () => {
    const registrationData = { giveaway_id: 2 };
    await expect(
      registrationServices.createRegistration(registrationData)
    ).rejects.toThrow("Participant ID is required");
  });

  it("createRegistration should throw if missing giveaway_id", async () => {
    const registrationData = { participant_id: 1 };
    await expect(
      registrationServices.createRegistration(registrationData)
    ).rejects.toThrow("Giveaway ID is required");
  });

  it("createRegistration should throw if registration already exists", async () => {
    const participantData = { participant_id: 1, giveaway_id: 2 };

    registrationRepository.findById.mockResolvedValue({
      participant_id: 1,
      giveaway_id: 2,
    });

    await expect(() =>
      registrationServices.createRegistration(participantData)
    ).rejects.toThrow("Already registered");

    expect(registrationRepository.findById).toHaveBeenCalledWith(1, 2);
    expect(registrationRepository.create).not.toHaveBeenCalled();
  });

  it("getAllRegistrations should call repository", () => {
    registrationServices.getAllRegistrations();
    expect(registrationRepository.findAll).toHaveBeenCalled();
  });

  it("getRegistrationById should call repository with correct params", () => {
    registrationServices.getRegistrationById(1, 2);
    expect(registrationRepository.findById).toHaveBeenCalledWith(1, 2);
  });

  it("deleteRegistration should call repository with correct params", () => {
    registrationServices.deleteRegistration(1, 2);
    expect(registrationRepository.delete).toHaveBeenCalledWith(1, 2);
  });
});
