const add = (stringValue) => {
  return parseInt(stringValue);
};

test("should check if add('1') returns 1", () => {
  expect(add("1")).toBe(1);
});
