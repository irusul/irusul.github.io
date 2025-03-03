// Winning shutdown codes (case insensitive)
const shutdownCodes = ["dino123"];
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

  // Convert user input to lowercase to ensure case insensitivity
  const userCode = inputField.value.trim().toLowerCase();
  inputField.value = ""; // Clear the input
  let message = `> ${userCode.toUpperCase()}\n`;

  if (shutdownCodes.includes(userCode)) {
    message += "✅ SUCCESS! T-Robot has been defeated! ✅\n";
    outputMessage(message);
    disableInput();
  } else {
    attempts++;
    if (attempts >= maxAttempts) {
      message += "❌ SYSTEM FAILURE! T-Robot has won! ❌\n";
      outputMessage(message);
      disableInput();
    } else {
      message += `❌ Incorrect Code (${attempts}/${maxAttempts}) - Try again! ❌\n`;
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

function disableInput() {
  inputField.disabled = true;
  submitBtn.disabled = true;
  inputField.placeholder = "Mission Failed. Refresh to retry.";
}
