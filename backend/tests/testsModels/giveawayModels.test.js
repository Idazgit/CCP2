import { describe, it, expect } from "vitest";
import { Giveaway } from "../../src/models/giveawayModels";

describe("Giveaway", () => {
  it("should validate a correct giveaway", () => {
    const giveaway = new Giveaway(1, "Summer Giveaway", 1000, "2025-12-31");
    expect(giveaway.isValide().valide).toBe(true);
  });

  it("should reject giveaway with empty name", () => {
    const giveaway = new Giveaway(1, "", 1000, "2025-12-31");
    const validation = giveaway.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Name is required");
  });

  it("should reject giveaway with undefined prize", () => {
    const giveaway = new Giveaway(
      1,
      "Summer Giveaway",
      undefined,
      "2025-12-31"
    );
    const validation = giveaway.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe(
      "Prize is required and must be a positive number"
    );
  });

  it("should reject giveaway with negative prize", () => {
    const giveaway = new Giveaway(1, "Summer Giveaway", -100, "2025-12-31");
    const validation = giveaway.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe(
      "Prize is required and must be a positive number"
    );
  });

  it("should reject giveaway with invalid draw date format", () => {
    const giveaway = new Giveaway(1, "Summer Giveaway", 1000, "invalid-date");
    const validation = giveaway.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe(
      "Draw date is required and must be a valid date"
    );
  });

  it("should reject giveaway with draw date in the past", () => {
    const giveaway = new Giveaway(1, "Summer Giveaway", 1000, "2024-01-01");
    const validation = giveaway.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Draw date cannot be in the past");
  });

  it("should reject giveaway with only spaces in name", () => {
    const giveaway = new Giveaway(1, "   ", 1000, "2025-12-31");
    const validation = giveaway.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Name is required");
  });
});
