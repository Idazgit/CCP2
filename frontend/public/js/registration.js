window.addEventListener("DOMContentLoaded", async () => {
  const select = document.getElementById("giveawaySelect");
  try {
    const res = await fetch("http://localhost:5000/giveaways");
    const giveaways = await res.json();

    giveaways.forEach((g) => {
      const option = document.createElement("option");
      option.value = g.giveaway_id;
      option.textContent = `${g.name} (${g.prize})`;
      select.appendChild(option);
    });
  } catch (err) {
    alert("Erreur lors du chargement des concours");
  }
});

document
  .getElementById("registrationForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const giveaway_id = parseInt(form.giveaway_id.value);
    const messageDiv = document.getElementById("message");

    try {
      const participantRes = await fetch(
        `http://localhost:5000/participants/email/${email}`
      );
      const participant = await participantRes.json();

      if (!participant || !participant.participant_id) {
        messageDiv.textContent = "Aucun participant trouvé avec cet email.";
        messageDiv.style.color = "red";
        return;
      }

      const registrationRes = await fetch(
        "http://localhost:5000/registrations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            participant_id: participant.participant_id,
            giveaway_id: giveaway_id,
          }),
        }
      );

      const result = await registrationRes.json();

      if (registrationRes.ok) {
        messageDiv.textContent = "Inscription au concours réussie ! 🎉";
        messageDiv.style.color = "green";
        form.reset();
      } else {
        messageDiv.textContent =
          result.error || "Erreur lors de l'inscription.";
        messageDiv.style.color = "red";
      }
    } catch (err) {
      messageDiv.textContent = "Erreur réseau.";
      messageDiv.style.color = "red";
    }
  });
