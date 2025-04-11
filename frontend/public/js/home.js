window.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("giveawayList");

  try {
    const res = await fetch("http://localhost:5000/giveaways");
    const giveaways = await res.json();

    if (giveaways.length === 0) {
      container.innerHTML = "<p>Aucun concours pour le moment.</p>";
      return;
    }

    giveaways.forEach((g) => {
      const div = document.createElement("div");
      div.classList.add("giveaway-item");
      div.innerHTML = `
          <strong>${g.name}</strong><br/>
          Prize: ${g.prize}<br/>
          Date: ${new Date(g.draw_date).toLocaleDateString()}
        `;
      container.appendChild(div);
    });
  } catch (err) {
    container.innerHTML = "<p>Erreur lors du chargement des concours.</p>";
  }
});
