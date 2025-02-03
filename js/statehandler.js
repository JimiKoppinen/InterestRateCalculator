let calculationData = [];

export function addResultToArray(
  investment,
  finalProfit,
  finalCapital,
  finalPercentage,
  years
) {
  calculationData.push({
    investment,
    finalProfit,
    finalCapital,
    finalPercentage,
    years,
  });
  addRow(calculationData);
}

function addRow(data) {
  let currIndex = data.length - 1;
  let thisTrId = `tr${data.length}`;

  let tr = document.createElement("tr");
  tr.setAttribute("id", thisTrId);
  document.getElementById("tr0").appendChild(tr);

  //initiate an array with td-elements for the results table
  let tdArray = [];
  for (let i = 0; i < 6; i++) {
    tdArray[i] = document.createElement("td");
  }

  tdArray[0].innerHTML = `${currIndex + 1}.`;
  document.getElementById(thisTrId).appendChild(tdArray[0]);

  tdArray[1].setAttribute("class", "boldTd");
  tdArray[1].innerHTML = `${data[currIndex].investment}`;
  document.getElementById(thisTrId).appendChild(tdArray[1]);

  tdArray[2].innerHTML = `${data[currIndex].finalCapital}`;
  document.getElementById(thisTrId).appendChild(tdArray[2]);

  tdArray[3].innerHTML = `${data[currIndex].finalProfit}`;
  document.getElementById(thisTrId).appendChild(tdArray[3]);

  tdArray[4].innerHTML = `${data[currIndex].finalPercentage} %`;
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
  const row = event.target.closest("tr");

  if (row) {
    row.remove();
  }
}
