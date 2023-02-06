const outputDisplayNumber = document.querySelector(".output");
const historyDisplayNumber = document.querySelector(".history");
const equal = document.querySelector(".equal");
const decimal = document.querySelector(".dot");
const clear = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let currentNum = "";
let previousNum = "";
let operator = "";

equal.addEventListener("click", compute);
decimal.addEventListener("click", addDecimal);
clear.addEventListener("click", clearCalculator);
deleteButton.addEventListener("click", handleDelete);
numberButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => handleNumber(e.target.textContent))
);
window.addEventListener("keydown", handleKeyboardEvent);

operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleNumber(number) {
  if (previousNum !== "" && currentNum !== "" && operator === "") {
    previousNum = "";
  } else {
    currentNum += number;
  }
  updateTextContent(outputDisplayNumber, currentNum);
}

function handleOperator(op) {
  if (!currentNum && !previousNum) {
    return;
  }
  if (!previousNum) {
    previousNum = currentNum;
    operatorCheck(op);
  } else {
    compute();
    operator = op;
    updateTextContent(outputDisplayNumber, "");
    updateTextContent(historyDisplayNumber, previousNum + " " + operator);
  }
}

function operatorCheck(text) {
  operator = text;
  updateTextContent(historyDisplayNumber, previousNum + " " + operator);
  updateTextContent(outputDisplayNumber, "");
  currentNum = "";
}

function compute() {
  let result;
  const parsedPreviousNumber = parseFloat(previousNum);
  const parsedCurrentNumber = parseFloat(currentNum);
  if (isNaN(parsedPreviousNumber) || isNaN(parsedCurrentNumber)) return;
  switch (operator) {
    case "+":
      result = parsedPreviousNumber + parsedCurrentNumber;
      break;
    case "-":
      result = parsedPreviousNumber - parsedCurrentNumber;
      break;
    case "x":
      result = parsedPreviousNumber * parsedCurrentNumber;
      break;
    case "/":
      if (currentNum <= 0) {
        previousNum = "Error";
        displayResults();
        previousNum = "";
        return;
      }
      result = parsedPreviousNumber / parsedCurrentNumber;
      break;
    default:
      return;
  }
  previousNum = result.toString();
  displayResults();
}

function updateTextContent(displayNumber, value) {
  displayNumber.textContent = value;
}

function displayResults() {
  updateTextContent(outputDisplayNumber, previousNum);
  updateTextContent(historyDisplayNumber, "");
  operator = "";
  currentNum = "";
}

function clearCalculator() {
  currentNum = "";
  previousNum = "";
  operator = "";
  outputDisplayNumber.textContent = "";
  historyDisplayNumber.textContent = "";
}

function addDecimal() {
  if (!currentNum) {
    currentNum = "0.";
  } else if (!currentNum.includes(".")) {
    currentNum += ".";
  }
  updateTextContent(outputDisplayNumber, currentNum);
}

function handleKeyboardEvent(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if (
    e.key === "Enter" ||
    (e.key === "=" && currentNum != "" && previousNum != "")
  ) {
    compute();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/") {
    handleOperator(e.key);
  }
  if (e.key === "*") {
    handleOperator("x");
  }
  if (e.key === ".") {
    addDecimal();
  }
  if (e.key === "Backspace") {
    handleDelete();
  }
}

function handleDelete() {
  if (currentNum && !previousNum) {
    currentNum = currentNum.slice(0, -1);
    updateTextContent(outputDisplayNumber, currentNum);
  } else {
    currentNum = previousNum;
    updateTextContent(outputDisplayNumber, previousNum);
    previousNum = "";
    updateTextContent(historyDisplayNumber, "");
  }
}
