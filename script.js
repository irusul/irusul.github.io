// Language translations
const translations = {
  en: {
    pageTitle: "Escape Room: Defeat T-Robot",
    terminalInstruction: "> Enter the code and press ENTER.",
    submitBtn: "Submit",
    inputPlaceholder: "Enter code...",
    success: "✅ MISSION SUCCESS! You escaped! ✅",
    failure: "❌ MISSION FAILED! T-Robot won! ❌",
    wrong: (attempt, max) => `❌ Wrong Code (${attempt}/${max}) - Try again! ❌`
  },
  de: {
    pageTitle: "Escape Room: Besiege T-Robot",
    terminalInstruction: "> Gib den Code ein und drücke ENTER.",
    submitBtn: "Überprüfen",
    inputPlaceholder: "Code eingeben...",
    success: "✅ MISSION ERFOLGREICH! Du bist entkommen! ✅",
    failure: "❌ MISSION GESCHEITERT! T-Robot hat gewonnen! ❌",
    wrong: (attempt, max) => `❌ Falscher Code (${attempt}/${max}) - Erneut versuchen! ❌`
  }
};

let currentLanguage = "en";
const shutdownCodes = {
  en: ["code123"],
  de: ["code123"]
};
let attempts = 0;
const maxAttempts = 3;

const outputDiv = document.getElementById("output");
const inputField = document.getElementById("codeInput");
const submitBtn = document.getElementById("submitBtn");
const languageSelect = document.getElementById("languageSelect");

// Update UI for language change
function updateLanguage() {
  document.getElementById("pageTitle").textContent = translations[currentLanguage].pageTitle;
  document.getElementById("terminalInstruction").textContent = translations[currentLanguage].terminalInstruction;
  inputField.placeholder = translations[currentLanguage].inputPlaceholder;
  submitBtn.textContent = translations[currentLanguage].submitBtn;

  document.getElementById("introduction-en").style.display = currentLanguage === "en" ? "block" : "none";
  document.getElementById("introduction-de").style.display = currentLanguage === "de" ? "block" : "none";
}

// Language selection event
languageSelect.addEventListener("change", function() {
  currentLanguage = languageSelect.value;
  updateLanguage();
});

// Initial UI update
updateLanguage();

// Check Code Function
submitBtn.addEventListener("click", checkCode);
inputField.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    checkCode();
  }
});

function checkCode() {
  if (attempts >= maxAttempts) return;

  const userCode = inputField.value.trim().toLowerCase();
  inputField.value = "";
  let message = `> ${userCode.toUpperCase()}\n`;

  if (shutdownCodes[currentLanguage].includes(userCode)) {
    message += translations[currentLanguage].success;
    outputMessage(message);
    disableInput(true);
  } else {
    attempts++;
    if (attempts >= maxAttempts) {
      message += translations[currentLanguage].failure;
      outputMessage(message);
      disableInput(false);
    } else {
      message += translations[currentLanguage].wrong(attempts, maxAttempts);
      outputMessage(message);
    }
  }
}

function outputMessage(message) {
  const para = document.createElement("p");
  para.textContent = message;
  outputDiv.appendChild(para);
  document.getElementById("terminal").scrollTop = document.getElementById("terminal").scrollHeight;
}

function disableInput(isSuccess) {
  inputField.disabled = true;
  submitBtn.disabled = true;
  inputField.placeholder = isSuccess
    ? currentLanguage === "en"
      ? "MISSION SUCCESS! Refresh to play again."
      : "MISSION ERFOLGREICH! Aktualisiere zum Neustart."
    : currentLanguage === "en"
      ? "MISSION FAILED. Refresh to retry."
      : "MISSION GESCHEITERT. Aktualisiere zum Versuch.";
}
