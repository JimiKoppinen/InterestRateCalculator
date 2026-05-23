import { RESULT_TABLE_LENGTH, TD_ARRAY_INDEXES, ADDITIONAL_CELL_DATA_KEYS } from './constants.js';

let calculationState = [];
// Monotonically increasing counter — never decremented on delete,
// so row IDs are always unique and never collide with existing rows.
let rowCounter = 0;

export function addResultToArray(result) {
  const { investment, finalProfit, finalCapital, finalPercentage, years } = result;

  rowCounter++;
  calculationState.push({
    investment,
    finalProfit,
    finalCapital,
    finalPercentage,
    years,
    rowId: rowCounter,
  });

  addRow(calculationState);
}

function addRow(calculationData) {
  const rowIndex = calculationData.length - 1;
  const stateItem = calculationData[rowIndex];
  const thisTrId = `tr${stateItem.rowId}`;

  const tr = document.createElement('tr');
  tr.setAttribute('id', thisTrId);
  document.getElementById('tr0').appendChild(tr);

  //initiate an array with td-elements for the results table
  const tdArray = Array.from({ length: RESULT_TABLE_LENGTH }, () => document.createElement('td'));
  tdArray.forEach((td) => appendChildren(thisTrId, td));

  addContent(tdArray, rowIndex);
  createDeleteButton(thisTrId);
}

function createDeleteButton(rowId) {
  const td = document.createElement('td');
  const button = document.createElement('button');
  button.textContent = 'Poista Rivi';
  button.setAttribute(ADDITIONAL_CELL_DATA_KEYS.classKey, 'deleteButton');
  button.addEventListener('click', deleteRow);
  td.appendChild(button);
  appendChildren(rowId, td);
}

function addContent(tdArray, rowIndex) {
  tdArray[TD_ARRAY_INDEXES.rowNumber].textContent = `${rowIndex + 1}.`;
  tdArray[TD_ARRAY_INDEXES.investment].setAttribute(
    ADDITIONAL_CELL_DATA_KEYS.classKey,
    ADDITIONAL_CELL_DATA_KEYS.boldTd
  );
  tdArray[TD_ARRAY_INDEXES.investment].textContent = calculationState[rowIndex].investment;
  tdArray[TD_ARRAY_INDEXES.finalCapital].textContent = calculationState[rowIndex].finalCapital;
  tdArray[TD_ARRAY_INDEXES.finalProfit].textContent = calculationState[rowIndex].finalProfit;
  tdArray[TD_ARRAY_INDEXES.finalPercentage].textContent =
    `${calculationState[rowIndex].finalPercentage} %`;
  tdArray[TD_ARRAY_INDEXES.years].textContent = calculationState[rowIndex].years;
}

function appendChildren(parentElementId, childElement) {
  document.getElementById(parentElementId).appendChild(childElement);
}

function deleteRow(event) {
  const row = event.target.closest('tr');

  if (row) {
    // Find the state entry by its stored rowId (not by array index derived from DOM id)
    const rowId = parseInt(row.id.replace('tr', ''), 10);
    const stateIndex = calculationState.findIndex((item) => item.rowId === rowId);
    if (stateIndex !== -1) {
      calculationState.splice(stateIndex, 1);
    }
    row.remove();
  }
}
