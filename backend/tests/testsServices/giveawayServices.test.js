import { describe, it, expect, vi, beforeEach } from "vitest";
import { giveawayServices } from "../../src/services/giveawayServices";
import { giveawayRepository } from "../../src/repositories/giveawayRepositories";
import { Giveaway } from "../../src/models/giveawayModels";

// Mock du giveawayRepository
vi.mock("../../src/repositories/giveawayRepositories", () => ({
  giveawayRepository: {
    findAll: vi.fn(),
    create: vi.fn(),
    findById: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("giveawayServices", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getAllGiveaways should return all giveaways", async () => {
    const mockGiveaways = [
      new Giveaway(1, "Summer Giveaway", 1000, "2025-12-31"),
      new Giveaway(2, "Winter Giveaway", 500, "2025-11-30"),
    ];
    giveawayRepository.findAll.mockResolvedValue(mockGiveaways);

    const giveaways = await giveawayServices.getAllGiveaways();

    expect(giveaways).toEqual(mockGiveaways);
    expect(giveawayRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("createGiveaway should create a new giveaway", async () => {
    const giveawayData = {
      name: "Spring Giveaway",
      prize: 2000,
      draw_date: "2025-10-15",
    };
    const mockGiveaway = new Giveaway(
      null,
      "Spring Giveaway",
      2000,
      "2025-10-15"
    );
    const mockResult = { id: 1 };

    giveawayRepository.create.mockResolvedValue(mockResult);

    const result = await giveawayServices.createGiveaway(giveawayData);

    expect(result).toEqual(mockResult);
    expect(giveawayRepository.create).toHaveBeenCalledWith(mockGiveaway);
  });

  it("createGiveaway should throw an error if validation fails", () => {
    const invalidGiveawayData = { name: "", prize: -100, draw_date: "invalid" };

    expect(() => giveawayServices.createGiveaway(invalidGiveawayData)).toThrow(
      "Name is required"
    );
  });

  it("getGiveawayById should return a giveaway by ID", async () => {
    const mockGiveaway = new Giveaway(1, "Summer Giveaway", 1000, "2025-12-31");
    giveawayRepository.findById.mockResolvedValue(mockGiveaway);

    const giveaway = await giveawayServices.getGiveawayById(1);

    expect(giveaway).toEqual(mockGiveaway);
    expect(giveawayRepository.findById).toHaveBeenCalledWith(1);
  });

  it("updateGiveaway should update a giveaway", async () => {
    const giveawayData = {
      name: "Updated Giveaway",
      prize: 1500,
      draw_date: "2025-12-25",
    };
    const mockGiveaway = new Giveaway(
      1,
      "Updated Giveaway",
      1500,
      "2025-12-25"
    );
    const mockResult = { changes: 1 };

    giveawayRepository.update.mockResolvedValue(mockResult);

    const result = await giveawayServices.updateGiveaway(1, giveawayData);

    expect(result).toEqual(mockResult);
    expect(giveawayRepository.update).toHaveBeenCalledWith(mockGiveaway);
  });

  it("deleteGiveaway should delete a giveaway by ID", async () => {
    const mockResult = { changes: 1 };

    giveawayRepository.delete.mockResolvedValue(mockResult);

    const result = await giveawayServices.deleteGiveaway(1);

    expect(result).toEqual(mockResult);
    expect(giveawayRepository.delete).toHaveBeenCalledWith(1);
  });
});
