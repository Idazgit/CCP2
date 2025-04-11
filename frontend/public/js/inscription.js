document
  .getElementById("registrationForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      participant_id: form.participant_id.value,
      giveaway_id: form.giveaway_id.value,
    };

    try {
      const res = await fetch("http://localhost:5000/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      const messageDiv = document.getElementById("message");

      if (res.ok) {
        messageDiv.textContent = "Registration successful ✅";
        messageDiv.style.color = "green";
        form.reset();
      } else {
        messageDiv.textContent = result.error || "Error during registration.";
        messageDiv.style.color = "red";
      }
    } catch (err) {
      document.getElementById("message").textContent = "Network error.";
      document.getElementById("message").style.color = "red";
    }
  });
