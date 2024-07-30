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
  let negativeNumbers = '';

  if (stringValue.match(delimiters)) {
    const numbers = stringValue.split(delimiters);
    console.log("numbers", numbers);
    for (const number of numbers) {
      if (number != "" && !isNaN(number)) {
        if (parseInt(number) >= 0) {
          total += parseInt(number);
        } else {
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

test("should check if add('') returns 0", () => {
  expect(add("")).toBe(0);
});

test("should check if add('1') returns 1", () => {
  expect(add("1")).toBe(1);
});

test("should check if add('1,5') returns 6", () => {
  expect(add("1,5")).toBe(6);
});

test("should check if add('1,5,6,2,1') returns 15", () => {
  expect(add("1,5,6,2,1")).toBe(15);
});

test("should check if add('1\\n2,3') returns 6", () => {
  expect(add("1\n2,3")).toBe(6);
});

test("should check if provided delimiter returns correct output as '//;\\n1;2' returns 3", () => {
  expect(add("//;\n1;2")).toBe(3);
});

test("should check if provided delimiter returns correct output as '//,;\\n1;2\n3,4' returns 10", () => {
  expect(add("//,;\n1;2\n3,4")).toBe(10);
});

test("should throw an exception if a negative number is inputed as add('-1')", () => {
  expect(() => add("-1")).toThrow("negative numbers not allowed -1");
});

test("should throw an exception if more than one negative number is inputed as add('-1,-2,-3') without delimiter", () => {
  expect(() => add("-1,-2,-3")).toThrow("negative numbers not allowed -1, -2, -3");
});

test("should throw an exception if more than one negative number is inputed as add('//;\n-1;-2;-3') with delimiter", () => {
  expect(() => add("//;\n-1;-2;-3")).toThrow("negative numbers not allowed -1, -2, -3");
});
