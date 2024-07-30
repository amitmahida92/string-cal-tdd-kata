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
    console.log("numbers", numbers);
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

describe("Basic tests just with comma(,) as a delimiter & without specific delimiter in string", () => {
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

describe("Intermediate tests with comma and line break(\n) as a delimiter ", () => {
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

describe("Advance tests with negative values, multiple delimiters & exception being thrown", () => {
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

describe("Additional tests", () => {
  test("should bypass numbers more than 1000", () => {
    expect(add("//;\n2;1001")).toBe(2);
  });

  test("should perform addition with delimiters of any length", () => {
    expect(add("//***\n1***2***3")).toBe(6);
  });
  
});
