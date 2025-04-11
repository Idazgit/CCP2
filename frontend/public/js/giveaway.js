document
  .getElementById("giveawayForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      prize: parseFloat(form.prize.value),
      draw_date: form.draw_date.value,
    };

    try {
      const res = await fetch("http://localhost:5000/giveaways", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      const messageDiv = document.getElementById("message");

      if (res.ok) {
        messageDiv.textContent = "Concours créé avec succès ✅";
        messageDiv.style.color = "green";
        form.reset();
      } else {
        messageDiv.textContent = result.error || "Erreur lors de la création.";
        messageDiv.style.color = "red";
      }
    } catch (err) {
      document.getElementById("message").textContent = "Erreur réseau.";
      document.getElementById("message").style.color = "red";
    }
  });
