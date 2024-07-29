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

test("should check if add('1') returns 1", () => {
  expect(add("1")).toBe(1);
});

test("should check if add('1,2') returns 3", () => {
  expect(add("1,2")).toBe(3);
});
