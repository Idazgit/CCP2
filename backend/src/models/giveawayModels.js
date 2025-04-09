export class Giveaway {
  constructor(id, name, prize, draw_date) {
    this.id = id;
    this.name = name;
    this.prize = prize;
    this.draw_date = draw_date;
  }
  //Validation
  isValide() {
    if (!this.name || this.name.trim() === "") {
      return { valide: false, message: "Name is required" };
    }
    if (
      this.prize === undefined ||
      this.prize === null ||
      typeof this.prize !== "number" ||
      this.prize <= 0
    ) {
      return {
        valide: false,
        message: "Prize is required and must be a positive number",
      };
    }
    if (!this.draw_date || isNaN(Date.parse(this.draw_date))) {
      return {
        valide: false,
        message: "Draw date is required and must be a valid date",
      };
    }
    const drawDate = new Date(this.draw_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignore time for comparison
    if (drawDate < today) {
      return { valide: false, message: "Draw date cannot be in the past" };
    }
    return { valide: true, message: "Giveaway is valid" };
  }
}
