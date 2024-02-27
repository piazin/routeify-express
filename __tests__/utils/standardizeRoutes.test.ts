import { standardizeRoutes } from "../../src/utils/standardizeRoutes";

describe("Standardize Global Prefix", () => {
  it("to be returned empty string, if prefix to equal empty", () => {
    let routePath = "";

    expect(standardizeRoutes(routePath)).toBe(routePath);
  });
  it("to be return / + routePath, if prefix not start with /", () => {
    let routePath = "users";
    expect(standardizeRoutes(routePath)).toBe(`/${routePath}`);
  });
});
