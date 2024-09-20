//get value function
function getInputValueById(id) {
  return parseFloat(document.getElementById(id).value);
}

function showError(id) {
  document.getElementById(id).classList.remove("hidden");
}

function formatCurrency(amout) {
  return `${amout.toFixed(2)}`;
}

function addToHistory(income, totalExpenses, balance) {
  const historyItem = document.createElement("div");
  historyItem.className =
    "bg-white p-3 rounded-md border-l-2 border-indigo-500";

  historyItem.innerHTML = `
        <p class="text-xs text-gray-500">Serial: ${count}</p>
        <p class="text-xs text-gray-500">${new Date().toLocaleDateString()}</p>
        <p class="text-xs text-gray-500">Income: $${formatCurrency(income)}</p>
        <p class="text-xs text-gray-500">Expenses: $${formatCurrency(
          totalExpenses
        )}</p>
        <p class="text-xs text-gray-500">Balance: $${formatCurrency(
          balance
        )}</p>
    `;
  const historyContainer = document.getElementById("history-list");

  historyContainer.insertBefore(historyItem, historyContainer.firstChild);
}

// getting all the value
let count = 0;
// add event listener for calculate button
const calculateButton = document.getElementById("calculate");
calculateButton.addEventListener("click", function () {
  count += 1;
  //   const income = parseFloat(document.getElementById("income").value);
  //   const software = parseFloat(document.getElementById("software").value);
  //   const courses = parseFloat(document.getElementById("courses").value);
  //   const internet = parseFloat(document.getElementById("internet").value);
  //   get value from function
  const income = getInputValueById("income");
  const software = getInputValueById("software");
  const courses = getInputValueById("courses");
  const internet = getInputValueById("internet");

  if (income <= 0 || isNaN(income)) {
    // document.getElementById("income-error").classList.remove("hidden");
    showError("income-error");
    return;
  }
  if (software <= 0 || isNaN(software)) {
    // document.getElementById("software-error").classList.remove("hidden");
    showError("software-error");
    return;
  }

  const totalExpenses = software + courses + internet;
  const balance = income - totalExpenses;

  if (totalExpenses > income) {
    // document.getElementById("logic-error").classList.remove("hidden");
    showError("logic-error");
    return;
  }

  const totalExpensesElement = document.getElementById("total-expenses");
  totalExpensesElement.innerText = totalExpenses.toFixed(2);

  const balanceElement = document.getElementById("balance");
  balanceElement.innerText = balance.toFixed(2);

  const result = document.getElementById("results");
  result.classList.remove("hidden");

  //history
  //   const historyItem = document.createElement("div");
  //   historyItem.className =
  //     "bg-white p-3 rounded-md border-l-2 border-indigo-500";

  //   historyItem.innerHTML = `
  //         <p class="text-xs text-gray-500">Serial: ${count}</p>
  //         <p class="text-xs text-gray-500">${new Date().toLocaleDateString()}</p>
  //         <p class="text-xs text-gray-500">Income: $${formatCurrency(income)}</p>
  //         <p class="text-xs text-gray-500">Expenses: $${formatCurrency(
  //           totalExpenses
  //         )}</p>
  //         <p class="text-xs text-gray-500">Balance: $${formatCurrency(
  //           balance
  //         )}</p>
  //     `;
  //   const historyContainer = document.getElementById("history-list");

  //   historyContainer.insertBefore(historyItem, historyContainer.firstChild);

  addToHistory(income, totalExpenses, balance);
});

// add event listener for saving button
const calculateSavingsButton = document.getElementById("calculate-savings");
calculateSavingsButton.addEventListener("click", function () {
  const savingPercentace = parseFloat(document.getElementById("savings").value);
  const income = parseFloat(document.getElementById("income").value);
  const software = parseFloat(document.getElementById("software").value);
  const courses = parseFloat(document.getElementById("courses").value);
  const internet = parseFloat(document.getElementById("internet").value);

  const totalExpenses = software + courses + internet;
  const balance = income - totalExpenses;

  const savingAmout = (savingPercentace * balance) / 100;
  const remainingBalance = balance - savingAmout;
  const savingElement = document.getElementById("savings-amount");
  savingElement.innerText = savingAmout.toFixed(2);

  const remainingElement = document.getElementById("remaining-balance");
  remainingElement.innerText = remainingBalance.toFixed(2);
});

// history tab functionality

const historyTab = document.getElementById("history-tab");
const assistantTab = document.getElementById("assistant-tab");
historyTab.addEventListener("click", function () {
  historyTab.classList.add(
    "text-white",
    "bg-gradient-to-r",
    "from-blue-500",
    "to-purple-600"
  );

  historyTab.classList.remove("text-gray-600");
  assistantTab.classList.remove(
    "text-white",
    "bg-gradient-to-r",
    "from-blue-500",
    "to-purple-600"
  );
  assistantTab.classList.add("text-gray-600");

  document.getElementById("expense-form").classList.add("hidden");
  document.getElementById("history-section").classList.remove("hidden");
});

assistantTab.addEventListener("click", function () {
  assistantTab.classList.add(
    "text-white",
    "bg-gradient-to-r",
    "from-blue-500",
    "to-purple-600"
  );
  historyTab.classList.remove(
    "text-white",
    "bg-gradient-to-r",
    "from-blue-500",
    "to-purple-600"
  );
  document.getElementById("expense-form").classList.remove("hidden");
  document.getElementById("history-section").classList.add("hidden");
});

// live validation for input
// document.getElementById("income").addEventListener("input", function () {
//   const inputValue = parseFloat(document.getElementById("income").value);

//   if (isNaN(inputValue) || inputValue <= 0) {
//     document.getElementById("income-error").classList.remove("hidden");
//     return;
//   }
// });
