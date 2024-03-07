import express from "express";
import { storageControllerMetadata } from "../../src/storagemetadata";
import { logger } from "@utils";

export function useControllers(
  controllers: Function[],
  app: Partial<express.Application>,
  prefix: string = ""
) {
  controllers.forEach((controller) => {
    const routesOfController = storageControllerMetadata.get(controller.name);
    routesOfController?.forEach((routeOfController) => {
      routeOfController.routes.forEach((route) => {
        logger.info(
          `[${route.method.toUpperCase()}] ${prefix}${
            routeOfController.baseRouter
          }${route.routePath} [${controller.name}]`
        );
        app[route.method](
          `${prefix}${routeOfController.baseRouter}${route.routePath}`,
          route.handler
        );
      });
    });
  });
}
