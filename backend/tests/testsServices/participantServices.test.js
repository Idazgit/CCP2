import { describe, it, expect, vi, beforeEach } from "vitest";
import { participantServices } from "../../src/services/participantServices";
import { participantRepository } from "../../src/repositories/participantRepositories";
import { Participant } from "../../src/models/participantModels";

// Mock du participantRepository
vi.mock("../../src/repositories/participantRepositories", () => ({
  participantRepository: {
    findAll: vi.fn(),
    create: vi.fn(),
    findById: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("participantServices", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAllParticipants should return all participants", async () => {
    const mockParticipants = [
      new Participant(1, "John Doe", "john@example.com"),
      new Participant(2, "Jane Doe", "jane@example.com"),
    ];
    participantRepository.findAll.mockResolvedValue(mockParticipants);

    const participants = await participantServices.getAllParticipants();

    expect(participants).toEqual(mockParticipants);
    expect(participantRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("createParticipant should create a new participant", async () => {
    const participantData = { name: "John Doe", email: "john@example.com" };
    const mockParticipant = new Participant(
      null,
      "John Doe",
      "john@example.com"
    );
    const mockResult = { id: 1, changes: 1 };

    participantRepository.create.mockResolvedValue(mockResult);

    const result = await participantServices.createParticipant(participantData);

    expect(result).toEqual(mockResult);
    expect(participantRepository.create).toHaveBeenCalledWith(mockParticipant);
  });

  it("createParticipant should throw an error if validation fails", () => {
    const invalidParticipantData = { name: "", email: "invalid-email" };

    expect(() =>
      participantServices.createParticipant(invalidParticipantData)
    ).toThrow("Name is required");
  });

  it("getParticipantById should return a participant by ID", async () => {
    const mockParticipant = new Participant(1, "John Doe", "john@example.com");
    participantRepository.findById.mockResolvedValue(mockParticipant);

    const participant = await participantServices.getParticipantById(1);

    expect(participant).toEqual(mockParticipant);
    expect(participantRepository.findById).toHaveBeenCalledWith(1);
  });

  it("updateParticipant should update a participant", async () => {
    const participantData = {
      name: "John Updated",
      email: "john.updated@example.com",
    };
    const mockParticipant = new Participant(
      1,
      "John Updated",
      "john.updated@example.com"
    );
    const mockResult = { changes: 1 };

    participantRepository.update.mockResolvedValue(mockResult);

    const result = await participantServices.updateParticipant(
      1,
      participantData
    );

    expect(result).toEqual(mockResult);
    expect(participantRepository.update).toHaveBeenCalledWith(mockParticipant);
  });

  it("deleteParticipant should delete a participant by ID", async () => {
    const mockResult = { changes: 1 };

    participantRepository.delete.mockResolvedValue(mockResult);

    const result = await participantServices.deleteParticipant(1);

    expect(result).toEqual(mockResult);
    expect(participantRepository.delete).toHaveBeenCalledWith(1);
  });
});
