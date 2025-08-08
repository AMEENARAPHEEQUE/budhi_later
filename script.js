const preCalcQuestions = [
  "നീ എന്തിനാ എന്നെ ഉപയോഗിക്കുന്നത്? 🤔",
  "കണക്കു കുഴപ്പാനോ? 🤯",
  "സ്‌കൂളിൽ പോയില്ലേ, മാത്ത്സ് പഠിച്ചില്ലേ? 🎒📚"
];

const preCalcReplies = [
  "അങ്ങനെ ആണെങ്കിൽ ശരി 👍, നമുക്ക് കണക്കു നോക്കാം! 😄",
  "പറയണം, കുഴപ്പം വേണ്ട 😅, പക്ഷേ ഞാൻ നിങ്ങളെ സഹായിക്കാം! 🤝😄",
  "പോയാലും, പഠിച്ചാലും ഈ കണക്കു ഒക്കെ തലവേദന മാത്രം! 🤕🤣"
];

const fakeLoadingMessages = [
  "Calculating the meaning of life... 🔮",
  "Consulting ancient math scrolls... 📜",
  "Asking the AI gods... 🤖🙏",
  "Double checking with the universe... 🌌",
  "Oops! Calculator is on a break. Try again later! 😴"
];

const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const answerBtn = document.getElementById("answer-btn");
const replyText = document.getElementById("reply-text");

const calculator = document.getElementById("calculator");
const calcDisplay = document.getElementById("calc-display");
const calcButtons = document.getElementById("calc-buttons");
const clearBtn = document.getElementById("clear-btn");
const equalBtn = document.getElementById("equal-btn");

const loadingBox = document.getElementById("loading");
const loadingText = document.getElementById("loading-text");

const resultBox = document.getElementById("result-box");

let preIndex = 0;
let calcExpression = "";

function startPreQuestions() {
  questionBox.style.display = "block";
  calculator.style.display = "none";
  resultBox.style.display = "none";
  loadingBox.style.display = "none";
  preIndex = 0;
  questionText.textContent = preCalcQuestions[preIndex];
  replyText.textContent = "";
  answerInput.value = "";
  answerInput.focus();
}

answerBtn.addEventListener("click", () => {
  const ans = answerInput.value.trim();
  if (!ans) {
    alert("ഉത്തരം നൽകണം!");
    return;
  }
  replyText.textContent = preCalcReplies[preIndex];
  preIndex++;
  if (preIndex < preCalcQuestions.length) {
    questionText.textContent = preCalcQuestions[preIndex];
    answerInput.value = "";
    answerInput.focus();
  } else {
    questionBox.style.display = "none";
    calculator.style.display = "block";
    answerInput.value = "";
    calcExpression = "";
    calcDisplay.textContent = "0";
    replyText.textContent = "";
  }
});

answerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    answerBtn.click();
  }
});

calcButtons.addEventListener("click", (e) => {
  if (!e.target.classList.contains("calc-btn")) return;
  const key = e.target.dataset.key;
  if (!key) return;

  if (e.target.id === "clear-btn") {
    calcExpression = "";
    calcDisplay.textContent = "0";
    return;
  }
  if (e.target.id === "equal-btn") {
    uselessCalculate();
    return;
  }

  if (key === ".") {
    if (calcExpression === "" || /[+\-*/]$/.test(calcExpression)) {
      calcExpression += "0.";
    } else if (!calcExpression.includes(".")) {
      calcExpression += ".";
    }
    calcDisplay.textContent = calcExpression;
    return;
  }

  if (/[0-9+\-*/.]/.test(key)) {
    if (/[+\-*/]/.test(key)) {
      if (calcExpression === "" || /[+\-*/]$/.test(calcExpression)) {
        return;
      }
    }
    calcExpression += key;
    calcDisplay.textContent = calcExpression;
  }
});

window.addEventListener("keydown", (e) => {
  const allowedKeys = "0123456789+-*/.=EnterBackspace";
  if (!allowedKeys.includes(e.key)) return;

  if (e.key === "Enter") {
    uselessCalculate();
  } else if (e.key === "Backspace") {
    calcExpression = calcExpression.slice(0, -1);
    calcDisplay.textContent = calcExpression || "0";
  } else if (e.key === "=") {
    uselessCalculate();
  } else {
    if (/[0-9+\-*/.]/.test(e.key)) {
      if (/[+\-*/]/.test(e.key)) {
        if (calcExpression === "" || /[+\-*/]$/.test(calcExpression)) return;
      }
      calcExpression += e.key;
      calcDisplay.textContent = calcExpression;
    }
  }
});

function uselessCalculate() {
  if (calcExpression === "") return;

  calculator.style.display = "none";
  loadingBox.style.display = "block";
  resultBox.style.display = "none";

  let count = 0;
  const maxCount = 5;
  loadingText.textContent = fakeLoadingMessages[0];

  const loadingInterval = setInterval(() => {
    count++;
    if (count >= maxCount) {
      clearInterval(loadingInterval);
      showUselessResult();
      return;
    }
    loadingText.textContent =
      fakeLoadingMessages[Math.floor(Math.random() * fakeLoadingMessages.length)];
  }, 1500);
}

function showUselessResult() {
  loadingBox.style.display = "none";
  resultBox.style.display = "block";

  const sillyMessages = [
    "Sorry, I can't calculate this. Try rebooting your brain! 🧠💥",
    "Error 404: Answer not found. 🤷‍♂",
    "You have been punked! 😂"
  ];

  const msg = sillyMessages[Math.floor(Math.random() * sillyMessages.length)];

  resultBox.textContent = msg;

  const tryAgainBtn = document.createElement("button");
  tryAgainBtn.textContent = "Try Again";
  tryAgainBtn.style.marginTop = "15px";
  tryAgainBtn.style.padding = "10px 20px";
  tryAgainBtn.style.fontSize = "1.1rem";
  tryAgainBtn.style.borderRadius = "8px";
  tryAgainBtn.style.border = "2px solid #eee";
  tryAgainBtn.style.background = "#000";
  tryAgainBtn.style.color = "#eee";
  tryAgainBtn.style.cursor = "pointer";

  tryAgainBtn.addEventListener("click", () => {
    resultBox.style.display = "none";
    calculator.style.display = "none";
    startPreQuestions();
  });

  resultBox.appendChild(tryAgainBtn);
}

window.onload = () => {
  startPreQuestions();
};