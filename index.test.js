const { add, handleAdd, handleNegativeNumbers, handleMultiply } = require("./index");

xdescribe("Basic tests just with comma(,) as a delimiter & without specific delimiter in string", () => {
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
});

xdescribe("Intermediate tests with comma and line break(\n) as a delimiter ", () => {
  test("should check if add('1\\n2,3') returns 6", () => {
    expect(add("1\n2,3")).toBe(6);
  });

  test("should check if add('\n5,5\\n5,5') returns 20", () => {
    expect(add("\n5,5\n5,5")).toBe(20);
  });
});

describe("Advance tests with specific delimiters provided in string", () => {
  test("should check if provided delimiter returns correct output as '//;\\n1;2' returns 3", () => {
    expect(add("//;\n1;2")).toBe(3);
  });

  test("should check if provided delimiter returns correct output as '//,;\\n1;2\n3,4' returns 10", () => {
    expect(add("//,;\n1;2\n3,4")).toBe(10);
  });
});

xdescribe("Advance tests with negative values, multiple delimiters & exception being thrown", () => {
  test("should throw an exception if a negative number is inputed as add('-1')", () => {
    expect(() => add("-1")).toThrow("negative numbers not allowed -1");
  });

  test("should throw an exception if more than one negative number is inputed as add('-1,-2,-3') without delimiter", () => {
    expect(() => add("-1,-2,-3")).toThrow(
      "negative numbers not allowed -1, -2, -3"
    );
  });

  test("should throw an exception if more than one negative number is inputed as add('//;\n-1;-2;-3') with delimiter", () => {
    expect(() => add("//;\n-1;-2;-3")).toThrow(
      "negative numbers not allowed -1, -2, -3"
    );
  });

  test("should check if using hyphen(-) as a delimiter returns correct output as add('//-\\n-1--2--3')", () => {
    expect(add("//-\n-1--2--3")).toBe(6);
  });
});

xdescribe("Additional tests", () => {
  test("should bypass numbers more than 1000", () => {
    expect(add("//;\n2;1001")).toBe(2);
  });

  test("should perform addition with delimiters of any length", () => {
    expect(add("//***\n1***2***3")).toBe(6);
  });

  xtest("should perform addition with multiple delimiters as //*%\n1*2%3", () => {
    expect(add("//*%\n1*2%3")).toBe(6);
  });

  xtest("should perform addition with multiple delimiters in comination with any length as //*%%\n1*2%%3", () => {
    expect(add("//*%%\n1*2%%3")).toBe(6);
  });
});

describe("Test multiplication", () => {
  test("should multiply given numbers multiple('//*\n1*2')", () => {
    expect(add("//*\n1*2")).toBe(2);
  });

  test("should multiply given numbers multiple('//*\n1*2*3')", () => {
    expect(add("//*\n1*2*3")).toBe(6);
  });
});

describe("Test handleNegativeNumbers", () => {
  test("should throw if negative numbers in array ['', '//' ,'-1']", () => {
    expect(() => handleNegativeNumbers(["", "-1"])).toThrow();
  });

  test("should not throw if only positive numbers in array ['', '//' ,'1']", () => {
    expect(() => handleNegativeNumbers(['', '//' ,'1'])).not.toThrow();
  });
});

describe("Test handleAdd", () => {
  test("should add given numbers array handleAdd(['', '1'])", () => {
    expect(handleAdd(["", "1"])).toBe(1);
  });

  test("should add given numbers array handleAdd(['/', '5', '6'])", () => {
    expect(handleAdd(["/", "5", "6"])).toBe(11);
  });

  test("should ignore negative numbers in given numbers array handleAdd(['1', '-5', '6'])", () => {
    expect(handleAdd(['1', '-5', '6'])).toBe(7);
  });
});

describe("Test handleMultiply", () => {
  test("should add given numbers array handleMultiply(['', '1'])", () => {
    expect(handleMultiply(["", "1"])).toBe(1);
  });

  test("should add given numbers array handleMultiply(['/', '5', '6'])", () => {
    expect(handleMultiply(["/", "5", "6"])).toBe(30);
  });

  test("should ignore negative numbers in given numbers array handleMultiply(['1', '-5', '6'])", () => {
    expect(handleMultiply(['1', '-5', '6'])).toBe(7);
  });
});
