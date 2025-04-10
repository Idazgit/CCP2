export class Participant {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
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
    if (!this.password || this.password.length < 6) {
      return {
        valide: false,
        message: "Password must be at least 6 characters",
      };
    }
    return { valide: true, message: "Participant is valid" };
  }
}
