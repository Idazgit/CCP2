import { describe, it, expect } from "vitest";
import { Registration } from "../../src/models/registrationModels";

describe("Registration", () => {
  it("should validate a correct registration", () => {
    const registration = new Registration(1, 1, 2, "2025-04-09");
    const validation = registration.isValide();
    expect(validation.valide).toBe(true);
    expect(validation.message).toBe("Registration is valid");
  });

  it("should reject registration with empty participant_id", () => {
    const registration = new Registration(1, "", 2, "2025-04-09");
    const validation = registration.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Participant ID is required");
  });

  it("should reject registration with null participant_id", () => {
    const registration = new Registration(1, null, 2, "2025-04-09");
    const validation = registration.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Participant ID is required");
  });

  it("should reject registration with empty giveaway_id", () => {
    const registration = new Registration(1, 1, "", "2025-04-09");
    const validation = registration.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Giveaway ID is required");
  });

  it("should reject registration with null giveaway_id", () => {
    const registration = new Registration(1, 1, null, "2025-04-09");
    const validation = registration.isValide();
    expect(validation.valide).toBe(false);
    expect(validation.message).toBe("Giveaway ID is required");
  });

  it("should set the current date as default registration_date", () => {
    const registration = new Registration(1, 1, 2);
    const today = new Date().toISOString().split("T")[0];
    expect(registration.registration_date).toBe(today);
  });
});
