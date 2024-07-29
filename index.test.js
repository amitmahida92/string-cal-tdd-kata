const add = (stringValue) => {
  if (stringValue === "") {
    return 0;
  }
  if (stringValue.includes(",")) {
    const numbers = stringValue.split(",");
    return parseInt(numbers[0]) + parseInt(numbers[1]);
  }
  return parseInt(stringValue);
};

test("should check if add('') returns 0", () => {
  expect(add("0")).toBe(0);
});

test("should check if add('1') returns 1", () => {
  expect(add("1")).toBe(1);
});

test("should check if add('1,5') returns 6", () => {
  expect(add("1,5")).toBe(6);
});
