// Winning codes stored in uppercase
const winningCodes = ["WIN123", "LUCKY456", "PRIZE789"];
let attempts = 0;
const maxAttempts = 3;

const outputDiv = document.getElementById("output");
const inputField = document.getElementById("codeInput");
const submitBtn = document.getElementById("submitBtn");

// Submit code on button click or when the Enter key is pressed
submitBtn.addEventListener("click", checkCode);
inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkCode();
  }
});

function checkCode() {
  if (attempts >= maxAttempts) return; // No further attempts if game over

  // Convert user input to uppercase to ensure case insensitivity
  const userCode = inputField.value.trim().toUpperCase();
  inputField.value = ""; // Clear the input
  let message = `> ${userCode}\n`;

  if (winningCodes.includes(userCode)) {
    message += "ACCESS GRANTED - ✅ You Won! ✅\n";
    outputMessage(message);
    disableInput();
  } else {
    attempts++;
    if (attempts >= maxAttempts) {
      message += "ACCESS DENIED - ❌ GAME OVER ❌\n";
      outputMessage(message);
      disableInput();
    } else {
      message += `ACCESS DENIED - ❌ Invalid Code (${attempts}/${maxAttempts}) ❌\n`;
      outputMessage(message);
    }
  }
}

function outputMessage(message) {
  const para = document.createElement("p");
  para.textContent = message;
  outputDiv.appendChild(para);
  // Auto-scroll to the bottom of the terminal
  document.getElementById("terminal").scrollTop =
    document.getElementById("terminal").scrollHeight;
}

function disableInput() {
  inputField.disabled = true;
  submitBtn.disabled = true;
  inputField.placeholder = "Game Over.";
}
