const add = (stringValue) => {
  if (stringValue === "") {
    return 0;
  }
  if (stringValue.includes(",")) {
    const delimiters = /[,\n]+/;
    const numbers = stringValue.split(delimiters);
    let total = 0;
    for (const number of numbers) {
      total += parseInt(number);
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
