let data = [];

//initiate a currency formatter
const formatter = new Intl.NumberFormat("fi-FI", {
  style: "currency",
  currency: "EUR",
});

function runCalc(event) {
  event.preventDefault();

  let investment = getFormattedInputValue("investment");
  let years = getFormattedInputValue("years");
  let monthly = getFormattedInputValue("monthly");
  let profit = getFormattedInputValue("profit");
  let monthlyProfit = Math.pow(1 + profit / 100, 1 / 12) - 1;
  let investmentForProfitCalc = investment;

  for (i = 0; i < years; i++) {
    // if we have monthly saving
    if (monthly) {
      for (j = 0; j < 12; j++) {
        // add monthly saving
        investment += monthly;
        // add profit
        investment = (1 + monthlyProfit) * investment;
      }
    } else {
      investment = (1 + profit / 100) * investment;
    }
  }

  let ultimCapital = investmentForProfitCalc + monthly * years * 12;

  let ultimProfit = calcOnlyProfit(investment, ultimCapital);

  let ultimPercentage = roundNumber(
    calcProfitPercentage(investment, ultimProfit)
  );

  addResultToArray(
    formatter.format(investment),
    formatter.format(ultimProfit),
    formatter.format(ultimCapital),
    ultimPercentage,
    years
  );
}

function addResultToArray(
  investment,
  ultimProfit,
  ultimCapital,
  ultimPercentage,
  years
) {
  data.push({
    investment,
    ultimProfit,
    ultimCapital,
    ultimPercentage,
    years,
  });
  addRow(data);
}

function getFormattedInputValue(inputSelector) {
  const returnValue = document.querySelector(`.${inputSelector}`).value;

  if (!returnValue) {
    return 0;
  } else {
    return parseFloat(returnValue);
  }
}

function roundNumber(num, decimals) {
  // if decimals not set, default to 0
  if (isNaN(decimals)) decimals = 0;

  // the actual rounding
  num = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return num;
}

function calcOnlyProfit(investmentAfter, ultimCapital) {
  return investmentAfter - ultimCapital;
}

function calcProfitPercentage(investment, ultimProfit) {
  if (!ultimProfit || !investment) {
    return 0.0;
  }
  let num = (ultimProfit / investment) * 100;
  return num.toFixed(2);
}

function addRow(data) {
  let currIndex = data.length - 1;
  let thisTrId = `tr${data.length}`;

  let tr = document.createElement("tr");
  tr.setAttribute("id", thisTrId);
  document.getElementById("tr0").appendChild(tr);

  //initiate an array with td-elements for the results  table
  let tdArray = [];
  for (let i = 0; i < 6; i++) {
    tdArray[i] = document.createElement("td");
  }

  tdArray[0].innerHTML = `${currIndex + 1}.`;
  document.getElementById(thisTrId).appendChild(tdArray[0]);

  tdArray[1].setAttribute("class", "boldTd");
  tdArray[1].innerHTML = `${data[currIndex].investment}`;
  document.getElementById(thisTrId).appendChild(tdArray[1]);

  tdArray[2].innerHTML = `${data[currIndex].ultimCapital}`;
  document.getElementById(thisTrId).appendChild(tdArray[2]);

  tdArray[3].innerHTML = `${data[currIndex].ultimProfit}`;
  document.getElementById(thisTrId).appendChild(tdArray[3]);

  tdArray[4].innerHTML = `${data[currIndex].ultimPercentage} %`;
  document.getElementById(thisTrId).appendChild(tdArray[4]);

  tdArray[5].innerHTML = `${data[currIndex].years}`;
  document.getElementById(thisTrId).appendChild(tdArray[5]);

  //Create a delete row button
  let touchEvent = "ontouchstart" in window ? "touchstart" : "click";
  //Create a delete row button
  let button = document.createElement("button");
  button.innerHTML = "Poista Rivi";
  button.setAttribute("class", "deleteButton");
  button.addEventListener(touchEvent, deleteRow);
  document.getElementById(thisTrId).appendChild(button);
}
function deleteRow(event) {
  const deletable = event.path[1].id;
  const row = document.getElementById(deletable);
  row.style.display = "none";
}
