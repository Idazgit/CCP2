import { describe, it, expect } from "vitest";
import { Winner } from "../../src/models/winnerModels.js";

describe("Winner Model", () => {
  it("should validate a valid Winner instance", () => {
    const winner = new Winner(1, 101, 202, 500);
    const validation = winner.isValide();
    expect(validation.valide).toBe(true);
    expect(validation.message).toBe("Winner is valid");
  });

  it("should invalidate if participant_id is missing", () => {
    const winner = new Winner(1, null, 202, 500);
    const validation = winner.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Participant ID is required");
  });

  it("should invalidate if giveaway_id is missing", () => {
    const winner = new Winner(1, 101, null, 500);
    const validation = winner.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Giveaway ID is required");
  });

  it("should invalidate if prize_won is not a positive number", () => {
    const winner = new Winner(1, 101, 202, -100);
    const validation = winner.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Prize must be a positive number");
  });

  it("should invalidate if prize_won is not a number", () => {
    const winner = new Winner(1, 101, 202, "not-a-number");
    const validation = winner.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Prize must be a positive number");
  });
});
