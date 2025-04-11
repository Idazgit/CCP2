export class Registration {
  constructor(
    id,
    participant_id,
    giveaway_id,
    registration_date = new Date().toISOString().split("T")[0]
  ) {
    this.id = id;
    this.participant_id = participant_id;
    this.giveaway_id = giveaway_id;
    this.registration_date = registration_date;
  }

  // Validation
  isValide() {
    if (!this.participant_id) {
      return { valide: false, message: "Participant ID is required" };
    }
    if (!this.giveaway_id) {
      return { valide: false, message: "Giveaway ID is required" };
    }
    return { valide: true, message: "Registration is valid" };
  }
}
