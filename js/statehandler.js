import { RESULT_TABLE_LENGTH, TD_ARRAY_INDEXES, ADDITIONAL_CELL_DATA_KEYS } from './constants.js';

let calculationState = [];

export function addResultToArray(result) {
  const { investment, finalProfit, finalCapital, finalPercentage, years } = result;

  calculationState.push({
    investment,
    finalProfit,
    finalCapital,
    finalPercentage,
    years,
  });

  addRow(calculationState);
}

function addRow(calculationData) {
  const rowIndex = calculationData.length - 1;
  const thisTrId = `tr${calculationData.length}`;

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
  button.innerHTML = 'Poista Rivi';
  button.setAttribute(ADDITIONAL_CELL_DATA_KEYS.classKey, 'deleteButton');
  button.addEventListener('click', deleteRow);
  td.appendChild(button);
  appendChildren(rowId, td);
}

function addContent(tdArray, rowIndex) {
  tdArray[TD_ARRAY_INDEXES.rowNumber].innerHTML = `${rowIndex + 1}.`;
  tdArray[TD_ARRAY_INDEXES.investment].setAttribute(
    ADDITIONAL_CELL_DATA_KEYS.classKey,
    ADDITIONAL_CELL_DATA_KEYS.boldTd
  );
  tdArray[TD_ARRAY_INDEXES.investment].innerHTML = `${calculationState[rowIndex].investment}`;
  tdArray[TD_ARRAY_INDEXES.finalCapital].innerHTML = `${calculationState[rowIndex].finalCapital}`;
  tdArray[TD_ARRAY_INDEXES.finalProfit].innerHTML = `${calculationState[rowIndex].finalProfit}`;
  tdArray[
    TD_ARRAY_INDEXES.finalPercentage
  ].innerHTML = `${calculationState[rowIndex].finalPercentage} %`;
  tdArray[TD_ARRAY_INDEXES.years].innerHTML = `${calculationState[rowIndex].years}`;
}

function appendChildren(parentElementId, childElement) {
  document.getElementById(parentElementId).appendChild(childElement);
}

function deleteRow(event) {
  const row = event.target.closest('tr');

  if (row) {
    row.remove();
  }
}
