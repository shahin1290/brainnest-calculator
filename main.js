let currentNum = "";
let previousNum = "";
let operator = "";

const currentDisplayNumber = document.querySelector(".output");
const previousDisplayNumber = document.querySelector(".history");
const equal = document.querySelector(".equal");
const decimal = document.querySelector(".dot");
const clear = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const changeButton = document.querySelector(".change");

window.addEventListener("keydown", handleKeyPress);

equal.addEventListener("click", compute);
decimal.addEventListener("click", addDecimal);
clear.addEventListener("click", clearCalculator);
deleteButton.addEventListener("click", handleDelete);
numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

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

  currentDisplayNumber.textContent = currentNum;
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
    currentDisplayNumber.textContent = "";
    previousDisplayNumber.textContent = previousNum + " " + operator;
  }
}

function operatorCheck(text) {
  operator = text;
  previousDisplayNumber.textContent = previousNum + " " + operator;
  currentDisplayNumber.textContent = "";
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
      result = parsedPreviousNumber / parsedCurrentNumber;
      break;
    default:
      return;
  }

  // if (operator === "+") {
  //   previousNum += currentNum;
  // } else if (operator === "-") {
  //   previousNum -= currentNum;
  // } else if (operator === "x") {
  //   previousNum *= currentNum;
  // } else if (operator === "%") {
  //   previousNum %= currentNum;
  // } else if (operator === "/") {
  //   if (currentNum <= 0) {
  //     previousNum = "Error";
  //     displayResults();
  //     return;
  //   }
  //   previousNum /= currentNum;
  // }

  console.log(result);
  previousNum = result.toString();
  displayResults();
}

function displayResults() {
  currentDisplayNumber.textContent = previousNum;
  previousDisplayNumber.textContent = "";
  operator = "";
  currentNum = "";
}

function clearCalculator() {
  currentNum = "";
  previousNum = "";
  operator = "";
  currentDisplayNumber.textContent = "";
  previousDisplayNumber.textContent = "";
}

function addDecimal() {
  if (!currentNum) {
    currentNum = "0.";
    currentDisplayNumber.textContent = currentNum;
  } else if (!currentNum.includes(".")) {
    currentNum += ".";
    currentDisplayNumber.textContent = currentNum;
  }
}

function handleKeyPress(e) {
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
    currentDisplayNumber.textContent = currentNum;
  } else {
    currentNum = previousNum;
    currentDisplayNumber.textContent = previousNum;
    previousNum = "";
    previousDisplayNumber.textContent = "";
  }
}
