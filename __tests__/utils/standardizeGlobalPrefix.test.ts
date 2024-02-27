import { standardizeGlobalPrefix } from "../../src/utils/standardizeGlobalPrefix";

describe("Standardize Global Prefix", () => {
  it("to be return /, if prefix to equal undefined", () => {
    let prefix = undefined;
    expect(standardizeGlobalPrefix(prefix)).toBe("/");
  });
  it("to be return / + prefix + /, if prefix not start with /", () => {
    let prefix = "users";
    expect(standardizeGlobalPrefix(prefix)).toBe(`/${prefix}/`);
  });
});
