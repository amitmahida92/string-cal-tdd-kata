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

  if (stringValue.match(delimiters)) {
    const numbers = stringValue.split(delimiters);
    // console.log(`numbers: ${JSON.stringify(numbers)}`);
    let total = 0;
    for (const number of numbers) {
      total += number && !isNaN(number) ? parseInt(number) : 0;
    }
    return total;
  }
  return parseInt(stringValue);
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

test("should check if provided delimiter returns correct output as '//;\\n1;2' return 3", () => {
  expect(add("//;\n1;2")).toBe(3);
});

test("should check if provided delimiter returns correct output as '//,;\\n1;2\n3,4' return 10", () => {
  expect(add("//,;\n1;2\n3,4")).toBe(10);
});
