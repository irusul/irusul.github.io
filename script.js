// Translations for dynamic texts
const translations = {
  en: {
    pageTitle: "Escape Room Puzzle: Defeat T-Robot",
    terminalInstruction: "> Enter the code and press ENTER or the button.",
    submitBtn: "Submit Code",
    inputPlaceholder: "Enter the code here...",
    success: "✅ MISSION SUCCESS! You have defeated T-Robot and are free! ✅",
    failure: "❌ MISSION FAILED! T-Robot has maintained control! ❌",
    wrong: (attempt, max) => `❌ Wrong Code (${attempt}/${max}) - Try again! ❌`
  },
  de: {
    pageTitle: "Escape Room Puzzle: Besiege T-Robot",
    terminalInstruction: "> Gib den Code ein und drücke ENTER oder den Button.",
    submitBtn: "Überprüfen",
    inputPlaceholder: "Gib den Code hier ein...",
    success: "✅ MISSION ERFOLGREICH! Du hast T-Robot deaktiviert und bist frei! ✅",
    failure: "❌ MISSION GESCHEITERT! T-Robot hat die Kontrolle behalten! ❌",
    wrong: (attempt, max) => `❌ Falscher Code (${attempt}/${max}) - Versuche es erneut! ❌`
  }
};

let currentLanguage = "en"; // Default language

// Game Variables
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

// Update UI based on current language
function updateLanguage() {
  // Update header title
  document.getElementById("pageTitle").textContent = translations[currentLanguage].pageTitle;
  
  // Show/hide introduction sections
  if (currentLanguage === "en") {
    document.getElementById("introduction-en").style.display = "block";
    document.getElementById("introduction-de").style.display = "none";
  } else {
    document.getElementById("introduction-en").style.display = "none";
    document.getElementById("introduction-de").style.display = "block";
  }
  
  // Update terminal instruction, input placeholder, and button text
  document.getElementById("terminalInstruction").textContent = translations[currentLanguage].terminalInstruction;
  inputField.placeholder = translations[currentLanguage].inputPlaceholder;
  submitBtn.textContent = translations[currentLanguage].submitBtn;
}

// Event listener for language change
languageSelect.addEventListener("change", function() {
  currentLanguage = languageSelect.value;
  updateLanguage();
});

// Initial UI update
updateLanguage();

// Event listeners for code submission
submitBtn.addEventListener("click", checkCode);
inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkCode();
  }
});

function checkCode() {
  if (attempts >= maxAttempts) return; // No further attempts if game is over

  const userCode = inputField.value.trim().toLowerCase();
  inputField.value = "";
  let message = `> ${userCode.toUpperCase()}\n`;

  // Check if the code is correct (use language-specific code list if needed)
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
  document.getElementById("terminal").scrollTop =
    document.getElementById("terminal").scrollHeight;
}

function disableInput(isSuccess) {
  inputField.disabled = true;
  submitBtn.disabled = true;
  inputField.placeholder = isSuccess
    ? (currentLanguage === "en"
         ? "MISSION SUCCESS! Refresh the page to play again."
         : "MISSION ERFOLGREICH! Aktualisiere die Seite, um erneut zu spielen.")
    : (currentLanguage === "en"
         ? "MISSION FAILED. Refresh the page to try again."
         : "MISSION GESCHEITERT. Aktualisiere die Seite, um es erneut zu versuchen.");
}
