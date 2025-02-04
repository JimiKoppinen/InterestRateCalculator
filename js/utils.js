export function roundNumber(num, decimals) {
  // if decimals not set, default to 0
  if (isNaN(decimals)) decimals = 0;

  // the actual rounding
  num = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return num;
}

//Number formatter for displaying the value
export const formatter = new Intl.NumberFormat('fi-FI', {
  style: 'currency',
  currency: 'EUR',
});

export function getFormattedInputValue(inputSelector) {
  const returnValue = document.querySelector(`.${inputSelector}`).value;

  if (!returnValue) {
    return 0;
  } else {
    return parseFloat(returnValue);
  }
}
