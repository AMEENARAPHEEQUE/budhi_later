// === Question logic ===
const questions = [
  "What's your lucky number today?",
  "If you were a math symbol, what would you be?",
  "Tell me a math joke (or just type anything!)"
];

const funnyReplies = [
  "Interesting choice!",
  "That sounds... mathematically mysterious.",
  "Lol! You have a weird brain. I like it.",
  "Now let’s do what you came for... calculate!"
];

let currentQ = 0;

const questionText = document.querySelector("h1");
const answerInput = document.querySelector("#answer");
const replyInput = document.querySelector("#reply");
const nextBtn1 = document.querySelector("#next1");
const nextBtn2 = document.querySelector("#next2");

nextBtn1.addEventListener("click", () => {
  const userAnswer = answerInput.value.trim();
  if (userAnswer === "") return;

  replyInput.placeholder = funnyReplies[currentQ];
  currentQ++;

  if (currentQ < questions.length) {
    questionText.textContent = questions[currentQ];
    answerInput.value = "";
  } else {
    document.querySelector(".q-box").style.display = "none";
    document.querySelector(".calc-container").style.display = "block";
  }
});

// === Calculator logic ===
let expression = "";
const resultDisplay = document.querySelector("#display");
const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (value === "C") {
      expression = "";
      resultDisplay.value = "";
    } else if (value === "=") {
      try {
        resultDisplay.value = eval(expression);
      } catch {
        resultDisplay.value = "Error";
      }
    } else {
      expression += value;
      resultDisplay.value = expression;
    }
  });
});
