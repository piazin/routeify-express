import express from "express";
import { storageControllerMetadata } from "../../src/storagemetadata";

export function useControllers(
  controllers: Function[],
  app: Partial<express.Application>,
  prefix: string = ""
) {
  controllers.forEach((controller) => {
    const routesOfController = storageControllerMetadata.get(controller.name);
    routesOfController?.forEach((routeOfController) => {
      routeOfController.routes.forEach((route) => {
        app[route.method](
          `${prefix}${routeOfController.baseRouter}${route.routePath}`,
          route.handler
        );
      });
    });
  });
}
