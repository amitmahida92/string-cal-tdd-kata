// this function will check if number is valid
const isValidNumber = (number) => {
  return (
    !isNaN(number.trim()) &&
    parseInt(number.trim()) >= 0 &&
    parseInt(number.trim()) <= 1000
  );
};

// this function will throw exception on negative numbers
const handleNegativeNumbers = (numbers) => {
  const negativeNumbers = numbers.filter(
    (number) => !isNaN(number) && parseInt(number) < 0
  );
  if (negativeNumbers?.length) {
    throw new Error(
      `negative numbers not allowed ${negativeNumbers
        .map((number) => number)
        .join(", ")
        .split(0, -2)}`
    );
  }
};

const handleMultiply = (numbers) => {
  return numbers
    .filter((n) => isValidNumber(n))
    .map((n) => parseInt(n))
    .reduce((ac, number) => (ac || 1) * number);
};

const handleAdd = (numbers) => {
  return numbers
    .filter((n) => isValidNumber(n))
    .map((n) => parseInt(n))
    .reduce((ac, number) => (ac || 0) + number);
};

const add = (stringValue) => {
  if (stringValue === "") {
    return 0;
  }

  // default delimiters
  let delimiters = /[,\n]+/;

  const regexToMatchDelimiter = /\/\/(.*?)\n/;
  const match = stringValue.match(regexToMatchDelimiter);

  if (match) {
    // explicit delimiter
    delimiters = new RegExp(`[${match[1]}\n]+`);
  }
  let numbers = stringValue.split(delimiters);

  handleNegativeNumbers(numbers);

  if (numbers.length > 1) {
    // delimiter exists
    if (match?.[1]?.split("")?.filter((char) => char === "*")?.length === 1) {
      console.log("multiply numbers");
      return handleMultiply(numbers);
    } else {
      console.log("add numbers");
      return handleAdd(numbers);
    }
  }
  
  // no delimiter
  return isValidNumber(numbers[0]) ? parseInt(numbers[0]) : 0;
};

module.exports = {
  add,
  handleMultiply,
  handleNegativeNumbers,
  handleAdd,
  isValidNumber,
};
