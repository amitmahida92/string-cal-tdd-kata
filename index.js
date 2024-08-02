const isValidNumber = (number) => {
  return (
    !isNaN(number.trim()) &&
    parseInt(number.trim()) >= 0 &&
    parseInt(number.trim()) <= 1000
  );
};

// this function will handle negative numbers
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
  return numbers.reduce((ac, number) =>
    isValidNumber(number) ? parseInt(ac || 1) * parseInt(number) : parseInt(ac || 1)
  );
};

const handleAdd = (numbers) => {
  return numbers.reduce((ac, number) =>
    isValidNumber(number) ? parseInt(ac || 0) + parseInt(number) : parseInt(ac || 0)
  );
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

  if (numbers.length === 1) {
    // no delimiter
    if (!isNaN(numbers[0]) && parseInt(numbers[0]) < 0) {
      throw new Error(`negative numbers not allowed ${numbers[0]}`);
    }

    return !isNaN(numbers[0]) ? parseInt(numbers[0]) : 0;
  } else if (numbers.length > 1) {
    // delimiter exists
    if (match?.[1]?.split("")?.filter((char) => char === "*")?.length === 1) {
      console.log("multiply numbers");
      return handleMultiply(numbers);
    } else {
      console.log("add numbers");
      return handleAdd(numbers);
    }
  }
};

module.exports = {
  add,
  handleMultiply,
  handleNegativeNumbers,
  handleAdd,
};
