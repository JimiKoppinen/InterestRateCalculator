import { RESULT_TABLE_LENGTH, TD_ARRAY_INDEXES, ADDITIONAL_CELL_DATA_KEYS } from './constants.js';

let calculationState = [];

// ── Initialise UI behaviours once the DOM is ready ──────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupClearButton();
});

// ── Public API used by main.js ───────────────────────────────────────────────
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
  hideEmptyState();
}

// ── Row creation ─────────────────────────────────────────────────────────────
function addRow(calculationData) {
  const rowIndex = calculationData.length - 1;
  const thisTrId = `tr${calculationData.length}`;

  const tr = document.createElement('tr');
  tr.setAttribute('id', thisTrId);

  // Slide-in animation
  tr.classList.add('row-entering');
  tr.addEventListener('animationend', () => tr.classList.remove('row-entering'), { once: true });

  // Append to <tbody> (not the table root)
  document.getElementById('resultsBody').appendChild(tr);

  // Create and populate table cells
  const tdArray = Array.from({ length: RESULT_TABLE_LENGTH }, () => document.createElement('td'));
  tdArray.forEach((td) => appendChildren(thisTrId, td));

  addContent(tdArray, rowIndex);
  createDeleteButton(thisTrId);
}

function createDeleteButton(rowId) {
  const td = document.createElement('td');
  const button = document.createElement('button');
  button.innerHTML = 'Poista';
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
  tdArray[TD_ARRAY_INDEXES.finalPercentage].innerHTML = `${calculationState[rowIndex].finalPercentage} %`;
  tdArray[TD_ARRAY_INDEXES.years].innerHTML = `${calculationState[rowIndex].years}`;
}

function appendChildren(parentElementId, childElement) {
  document.getElementById(parentElementId).appendChild(childElement);
}

// ── Row deletion ─────────────────────────────────────────────────────────────
function deleteRow(event) {
  const row = event.target.closest('tr');
  if (!row) return;

  row.classList.add('row-removing');
  row.addEventListener('animationend', () => {
    row.remove();
    renumberRows();
    showEmptyStateIfEmpty();
  }, { once: true });
}

/** Re-number the # column after a deletion. */
function renumberRows() {
  const rows = document.querySelectorAll('#resultsBody tr:not(.empty-state-row)');
  rows.forEach((row, index) => {
    const firstTd = row.querySelector('td:first-child');
    if (firstTd) firstTd.textContent = `${index + 1}.`;
  });
}

// ── Clear-all button ─────────────────────────────────────────────────────────
function setupClearButton() {
  const btn = document.getElementById('clearBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    calculationState = [];
    const tbody = document.getElementById('resultsBody');
    // Remove all data rows (keep the empty-state row)
    const dataRows = tbody.querySelectorAll('tr:not(.empty-state-row)');
    dataRows.forEach((row) => row.remove());
    showEmptyState();
  });
}

// ── Empty-state helpers ──────────────────────────────────────────────────────
function hideEmptyState() {
  const row = document.getElementById('emptyStateRow');
  if (row) row.style.display = 'none';
}

function showEmptyState() {
  const row = document.getElementById('emptyStateRow');
  if (row) row.style.display = '';
}

function showEmptyStateIfEmpty() {
  const dataRows = document.querySelectorAll('#resultsBody tr:not(.empty-state-row)');
  if (dataRows.length === 0) showEmptyState();
}
