import express from "express";
import logger from "@/utils/logger";
import { storageControllerMetadata } from "@/storagemetadata";

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
