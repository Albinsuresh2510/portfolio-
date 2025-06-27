document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // ✅ Console log BEFORE fetch
    console.log("Sending data:", { name, email, message });

    try {
      const response = await fetch("http://localhost:8080/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        alert("✅ Message sent successfully!");
        form.reset();
      } else {
        const errorText = await response.text();
        alert("❌ Failed to send message. Server said: " + errorText);
      }
    } catch (error) {
      console.error("Send error:", error);
      alert("⚠️ Something went wrong. Try again later.");
    }
  });
});
