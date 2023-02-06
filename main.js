// function getHistoryValue() {
//   return document.getElementById("history").innerText;
// }

// // write stuff to history area on UI
// function printHistoryValue(num) {
//   document.getElementById("history").innerText = num;
// }

// // read output value from UI
// function getOutputValue() {
//   return document.getElementById("output").innerText;
// }

// // write stuff to output area on UI
// function printOutputValue(num) {
//   if (num === "") {
//     document.getElementById("output").innerText = num;
//   } else {
//     document.getElementById("output").innerText = getFormattedNumber(num);
//   }
// }

// // nicely formats output string value to a comma separated value
// function getFormattedNumber(num) {
//   if (num == "-") {
//     return "";
//   }
//   var n = Number(num);
//   var value = n.toLocaleString("en");
//   return value;
// }

// // remove comma separation format from formatted output
// function reverseNumberFormat(num) {
//   return Number(num.replace(/,/g, ""));
// }

// addEventListener("DOMContentLoaded", function () {
//   // listen for operator keys click events
//   var operators = document.getElementsByClassName("operator");
//   var len = operators.length;
//   for (i = 0; i < len; i++) {
//     operators[i].addEventListener("click", function () {
//       if (this.id == "clear") {
//         printHistoryValue("");
//         printOutputValue("");
//       } else if (this.id == "backspace") {
//         var output = reverseNumberFormat(getOutputValue()).toString();
//         // check whether output has a value then remove last character and print to UI
//         if (output) {
//           output = output.substr(0, output.length - 1);
//           printOutputValue(output);
//         }
//       } else {
//         var output = getOutputValue();
//         var history = getHistoryValue();
//         // truncate non-numeric type last character from history value
//         if (output === "" && history !== "") {
//           if (isNaN(history[history.length - 1])) {
//             history = history.substr(0, history.length - 1);
//           }
//         }
//         if (output !== "" || history !== "") {
//           // tenary operation to set output to empty when it is empty
//           output = output === "" ? output : reverseNumberFormat(output);
//           history += output;
//           if (this.id === "=") {
//             var result = eval(history);
//             printOutputValue(result);
//             printHistoryValue("");
//           } else {
//             history += this.id;
//             printHistoryValue(history);
//             printOutputValue("");
//           }
//         }
//       }
//     });
//   }

//   // listen for number keys click events
//   var numbers = document.getElementsByClassName("number");
//   var val = numbers.length;
//   for (i = 0; i < val; i++) {
//     numbers[i].addEventListener("click", function () {
//       var output = reverseNumberFormat(getOutputValue());
//       if (!isNaN(output)) {
//         output += this.id;
//         printOutputValue(output);
//       }
//     });
//   }
// });

const body = document.querySelector("body"),
  modeToggle = document.querySelector(".dark-light");

modeToggle.addEventListener("click", () => {
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");
  if (!body.classList.contains("dark")) {
    localStorage.setItem("mode", "light-mode");
  } else {
    localStorage.setItem("mode", "dark-mode");
  }
});

// ---------------------------------------------

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

equal.addEventListener("click", () => {
  if (currentNum != "" && previousNum != "") {
    compute();
  }
});
decimal.addEventListener("click", addDecimal);
clear.addEventListener("click", clearCalculator);
deleteButton.addEventListener("click", handleDelete);
changeButton.addEventListener("click", handleChange);
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

function handleChange() {
  let newNumber;
  if (currentNum > 0) {
    newNumber = -Math.abs(currentNum);
  }
  if (currentNum < 0) {
    newNumber = Math.abs(currentNum);
  }
  currentNum = newNumber;
  currentDisplayNumber.textContent = newNumber;
}

function handleOperator(op) {
  if (!previousNum) {
    previousNum = currentNum;
    operatorCheck(op);
  } else if (!currentNum) {
    operatorCheck(op);
  } else {
    compute();
    operator = op;
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = previousNum + " " + operator;
  }
}

function operatorCheck(text) {
  operator = text;
  previousDisplayNumber.textContent = previousNum + " " + operator;
  currentDisplayNumber.textContent = "0";
  currentNum = "";
}

function compute() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);

  if (operator === "+") {
    previousNum += currentNum;
  } else if (operator === "-") {
    previousNum -= currentNum;
  } else if (operator === "x") {
    previousNum *= currentNum;
  } else if (operator === "%") {
    previousNum %= currentNum;
  } else if (operator === "/") {
    if (currentNum <= 0) {
      previousNum = "Error";
      displayResults();
      return;
    }
    previousNum /= currentNum;
  }
  // previousNum = previousNum.toString();
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
  currentDisplayNumber.textContent = "0";
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
    previousNum = previousNum.slice(0, -1);
    currentDisplayNumber.textContent = previousNum;
    previousDisplayNumber.textContent = "";
  }
}
