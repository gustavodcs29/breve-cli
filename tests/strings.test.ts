import { capitalize, pascalCase } from "../src/utils/strings";

describe("String Utilities", () => {
  it("should capitalize the first letter of a string", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("world")).toBe("World");
  });

  it("should convert a string to PascalCase", () => {
    expect(pascalCase("hello world")).toBe("HelloWorld");
    expect(pascalCase("another-test")).toBe("AnotherTest");
  });
});