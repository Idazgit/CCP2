window.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("#resultsTable tbody");

  try {
    const res = await fetch("http://localhost:5000/winners/results");
    const winners = await res.json();

    if (res.ok && winners.length > 0) {
      winners.forEach((winner) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${winner.giveaway_name}</td>
          <td>${winner.participant_name}</td>
          <td>${winner.participant_email}</td>
          <td>${winner.prize_won}</td>
        `;

        tableBody.appendChild(row);
      });
    } else {
      tableBody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center;">Aucun résultat disponible</td>
        </tr>
      `;
    }
  } catch (err) {
    console.error("Erreur lors du chargement des résultats :", err);
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; color: red;">Erreur lors du chargement des résultats</td>
      </tr>
    `;
  }
});
