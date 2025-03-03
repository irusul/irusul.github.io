// Winning shutdown codes (case insensitive)
const shutdownCodes = ["tr-ex1993", "stop-trobot", "dino123"];
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
    message += "✅ MISSION SUCCESS! T-Robot has been defeated! ✅";
    outputMessage(message);
    disableInput(true); // Pass `true` to indicate success
  } else {
    attempts++;
    if (attempts >= maxAttempts) {
      message += "❌ MISSION FAILED! T-Robot has won! ❌";
      outputMessage(message);
      disableInput(false); // Pass `false` to indicate failure
    } else {
      message += `❌ Incorrect Code (${attempts}/${maxAttempts}) - Try again! ❌`;
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
    ? "MISSION SUCCESS! Refresh to play again."
    : "MISSION FAILED. Refresh to retry.";
}
