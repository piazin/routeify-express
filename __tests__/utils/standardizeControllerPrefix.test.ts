import { standardizeControllerPrefix } from "../../src/utils/standardizeControler";

describe("ultis", () => {
  it("hould return a string without the / if it starts with /", () => {
    const prefix = "/users";
    expect(standardizeControllerPrefix(prefix)).toBe("users");
  });

  it("to be return original string if it not starts with /", () => {
    const prefix = "users";
    expect(standardizeControllerPrefix(prefix)).toBe(prefix);
  });
});
