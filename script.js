// Gewinner-Codes (Groß-/Kleinschreibung wird ignoriert)
const shutdownCodes = ["code123"];
let attempts = 0;
const maxAttempts = 3;

const outputDiv = document.getElementById("output");
const inputField = document.getElementById("codeInput");
const submitBtn = document.getElementById("submitBtn");

// Überprüfung beim Klicken auf den Button oder Drücken der Enter-Taste
submitBtn.addEventListener("click", checkCode);
inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkCode();
  }
});

function checkCode() {
  if (attempts >= maxAttempts) return; // Keine weiteren Versuche nach Spielende

  // Eingabe in Kleinbuchstaben umwandeln, um Groß-/Kleinschreibung zu ignorieren
  const userCode = inputField.value.trim().toLowerCase();
  inputField.value = ""; // Eingabefeld leeren
  let message = `> ${userCode.toUpperCase()}\n`;

  if (shutdownCodes.includes(userCode)) {
    message += "✅ MISSION ERFOLGREICH! Du hast T-Robot deaktiviert und bist frei! ✅";
    outputMessage(message);
    disableInput(true);
  } else {
    attempts++;
    if (attempts >= maxAttempts) {
      message += "❌ MISSION GESCHEITERT! T-Robot hat die Kontrolle behalten! ❌";
      outputMessage(message);
      disableInput(false);
    } else {
      message += `❌ Falscher Code (${attempts}/${maxAttempts}) - Versuche es erneut! ❌`;
      outputMessage(message);
    }
  }
}

function outputMessage(message) {
  const para = document.createElement("p");
  para.textContent = message;
  outputDiv.appendChild(para);
  document.getElementById("terminal").scrollTop =
    document.getElementById("terminal").scrollHeight;
}

function disableInput(isSuccess) {
  inputField.disabled = true;
  submitBtn.disabled = true;
  inputField.placeholder = isSuccess
    ? "MISSION ERFOLGREICH! Aktualisiere die Seite, um erneut zu spielen."
    : "MISSION GESCHEITERT. Aktualisiere die Seite, um es erneut zu versuchen.";
}
