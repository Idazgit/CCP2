export class Participant {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
  //Validation
  isValide() {
    if (!this.name || this.name.trim() === "") {
      return { valide: false, message: "Name is required" };
    }
    if (!this.email || this.email.trim() === "") {
      return { valide: false, message: "Email is required" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      return { valide: false, message: "Email is not valid" };
    }
    return { valide: true, message: "Participant is valid" };
  }
}
