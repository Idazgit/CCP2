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

document.getElementById("drawForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const giveawayId = form.giveawaySelect.value;
  const resultDiv = document.getElementById("winnerResult");

  try {
    const res = await fetch(
      `http://localhost:5000/winners/draw/${giveawayId}`,
      {
        method: "POST",
      }
    );

    const result = await res.json();

    if (res.ok && result.participant) {
      const p = result.participant;
      resultDiv.innerHTML = `
          🎉 Gagnant : <strong>${p.name}</strong><br/>
          Email : ${p.email}
        `;
      resultDiv.style.color = "green";

      setTimeout(() => {
        resultDiv.innerHTML = "";
      }, 5000);
    } else {
      resultDiv.textContent =
        result.error || "Aucun participant pour ce concours.";
      resultDiv.style.color = "red";

      setTimeout(() => {
        resultDiv.textContent = "";
      }, 5000);
    }
  } catch (err) {
    resultDiv.textContent = "Erreur lors du tirage au sort.";
    resultDiv.style.color = "red";

    setTimeout(() => {
      resultDiv.textContent = "";
    }, 5000);
  }
});
