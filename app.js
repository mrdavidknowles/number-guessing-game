let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Calc winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  guessInput.disabled = true;

  guessInput.style.borderColor = color;
  message.style.color = color;

  setMessage(msg);

  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Play again event listener
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);

  // Validate guess
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
    return;
  }

  // Check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!!`);
  } else {
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      gameOver(false, `Game Over. The correct number was ${winningNum}`);
    } else {
      guessInput.style.borderColor = "red";
      guessInput.value = "";

      setMessage(
        `${guess} is not correct, you have ${guessesLeft} guesses left`,
        "red"
      );
    }
  }
});
