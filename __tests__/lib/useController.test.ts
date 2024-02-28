import express, { Express } from "express";
import { useControllers } from "../../src/lib/useControllers";
import { storageControllerMetadata } from "../../src/storagemetadata";

describe("useController", () => {
  let app: Express;
  class MockClass {}
  const controllers = [MockClass];

  beforeAll(() => {
    app = express();

    storageControllerMetadata.set(MockClass.name, [
      {
        baseRouter: "/test",
        routes: [{ handler: app, method: "get", routePath: "" }],
      },
    ]);
  });

  it("should define the method correctly", () => {
    const mockApp: Partial<Express> = {
      get: jest.fn(),
    };

    useControllers(controllers, mockApp);

    expect(mockApp.get).toHaveBeenCalled();
  });
});
