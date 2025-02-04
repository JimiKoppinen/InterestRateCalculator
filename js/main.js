import { roundNumber, formatter, getFormattedInputValue } from './utils.js';
import { MONTHS_IN_YEAR, PERCENTAGE_TO_DECIMAL } from './constants.js';
import { addResultToArray } from './statehandler.js';

//Add event listener for the calculate button
document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.calcButton');
  button.addEventListener('click', function (event) {
    event.preventDefault();
    runCalc(event);
  });
});

function runCalc(event) {
  event.preventDefault();

  let investedAmount = getFormattedInputValue('investment');
  let years = getFormattedInputValue('years');
  let monthlyAmount = getFormattedInputValue('monthly');
  let profitPercentage = getFormattedInputValue('profit');
  let monthlyProfit = calculateMonthlyProfit(profitPercentage);
  let initialInvestmentAmount = investedAmount;

  for (let i = 0; i < years; i++) {
    // if we have monthly investments
    if (monthlyAmount) {
      for (let j = 0; j < MONTHS_IN_YEAR; j++) {
        // add monthly amounts
        investedAmount += monthlyAmount;
        // add monthly profit
        investedAmount = (1 + monthlyProfit) * investedAmount;
      }
    } else {
      investedAmount = (1 + profitPercentage / PERCENTAGE_TO_DECIMAL) * investedAmount;
    }
  }

  let finalCapital = calculateFinalCapital(initialInvestmentAmount, monthlyAmount, years);
  let finalProfit = calcFinalProfit(investedAmount, finalCapital);
  let finalPercentage = roundNumber(calcProfitPercentage(investedAmount, finalProfit));

  addResultToArray({
    investment: formatter.format(investedAmount),
    finalProfit: formatter.format(finalProfit),
    finalCapital: formatter.format(finalCapital),
    finalPercentage,
    years,
  });
}

function calculateMonthlyProfit(profitPercentage) {
  return Math.pow(1 + profitPercentage / PERCENTAGE_TO_DECIMAL, 1 / MONTHS_IN_YEAR) - 1;
}

function calculateFinalCapital(initialInvestment, monthlyInvestment, years) {
  return initialInvestment + monthlyInvestment * years * MONTHS_IN_YEAR;
}

function calcFinalProfit(investmentAfter, finalCapital) {
  return investmentAfter - finalCapital;
}

function calcProfitPercentage(investment, ultimProfit) {
  if (!ultimProfit || !investment) {
    return 0.0;
  }
  let num = (ultimProfit / investment) * PERCENTAGE_TO_DECIMAL;
  return num.toFixed(2);
}
