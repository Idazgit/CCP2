import { describe, it, expect } from "vitest";
import { Participant } from "../../src/models/participantModels";

describe("Participant", () => {
  it("should validate a correct participant", () => {
    const participant = new Participant(1, "John Doe", "john@example.com");
    expect(participant.isValide().valide).toBe(true);
  });

  it("should reject participant with empty name", () => {
    const participant = new Participant(1, "", "john@example.com");
    const validation = participant.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Name is required");
  });

  it("should reject participant with empty email", () => {
    const participant = new Participant(1, "John Doe", "");
    const validation = participant.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Email is required");
  });

  it("should reject participant with invalid email format", () => {
    const participant = new Participant(1, "John Doe", "invalidemail");
    const validation = participant.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Email is not valid");
  });

  it("should reject participant with only spaces in name", () => {
    const participant = new Participant(1, "   ", "john@example.com");
    const validation = participant.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Name is required");
  });

  it("should reject participant with only spaces in email", () => {
    const participant = new Participant(1, "John Doe", "   ");
    const validation = participant.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Email is required");
  });
});
