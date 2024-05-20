import {
  storageControllerMetadata,
  storageMethodMetadata,
} from "../../src/storagemetadata/index";

describe("storage", () => {
  it("should be defined", () => {
    expect(storageControllerMetadata).toBeDefined();
    expect(storageMethodMetadata).toBeDefined();
  });

  it("should be a Map", () => {
    expect(storageControllerMetadata).toBeInstanceOf(Map);
    expect(storageMethodMetadata).toBeInstanceOf(Map);
  });

  it("should have a size of 0", () => {
    expect(storageControllerMetadata.size).toBe(0);
    expect(storageMethodMetadata.size).toBe(0);
  });

  it("should have a size of 1", () => {
    storageControllerMetadata.set("key", [
      { baseRouter: "/users", routes: [] },
    ]);

    storageMethodMetadata.set("key", { method: "get", routePath: "/users" });

    expect(storageControllerMetadata.size).toBe(1);
    expect(storageControllerMetadata.size).toBe(1);
  });

  it("should have a size of 0", () => {
    storageControllerMetadata.clear();
    storageMethodMetadata.clear();

    expect(storageControllerMetadata.size).toBe(0);
    expect(storageMethodMetadata.size).toBe(0);
  });
});
