const add = (stringValue) => {
  if (stringValue === "") {
    return 0;
  }

  let delimiters = /[,\n]+/;
  const regexToMatchDelimiter = /\/\/(.*?)\n/;
  const match = stringValue.match(regexToMatchDelimiter);

  if (match) {
    delimiters = new RegExp(`[${match[1]}\n]+`);
  }

  let total = 0;
  let negativeNumbers = "";

  if (stringValue.match(delimiters)) {
    const numbers = stringValue.split(delimiters);
    for (const number of numbers) {
      if (number != "" && !isNaN(number)) {
        if (parseInt(number) >= 0 && parseInt(number) <= 1000) {
          total += parseInt(number);
        } else if (parseInt(number) < 0) {
          negativeNumbers += `${number}, `;
        }
      }
    }
  }
  if (negativeNumbers?.length || parseInt(stringValue) < 0) {
    negativeNumbers = negativeNumbers.slice(0, -2) || stringValue;
    throw new Error(`negative numbers not allowed ${negativeNumbers}`);
  }
  return total || parseInt(stringValue);
};

module.exports = {
  add
};