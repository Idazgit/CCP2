export class Winner {
  constructor(id, participant_id, giveaway_id, prize_won) {
    this.id = id;
    this.participant_id = participant_id;
    this.giveaway_id = giveaway_id;
    this.prize_won = prize_won;
  }

  // Validation
  isValide() {
    if (!this.participant_id) {
      return { valide: false, message: "Participant ID is required" };
    }
    if (!this.giveaway_id) {
      return { valide: false, message: "Giveaway ID is required" };
    }
    if (typeof this.prize_won !== "number" || this.prize_won <= 0) {
      return { valide: false, message: "Prize must be a positive number" };
    }
    return { valide: true, message: "Winner is valid" };
  }
}
