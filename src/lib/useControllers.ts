import express from "express";
import logger from "@/utils/logger";
import { storageControllerMetadata } from "@/storagemetadata";
import { standardizeFullPath } from "@/utils/standardize-full-path";

export function useControllers(
  controllers: Function[],
  app: Partial<express.Application>,
  prefix: string = ""
) {
  controllers.forEach((controller) => {
    const routesOfController = storageControllerMetadata.get(controller.name);
    routesOfController?.forEach((routeOfController) => {
      routeOfController.routes.forEach((route) => {
        const fullPath = standardizeFullPath([
          prefix,
          routeOfController.baseRouter,
          route.routePath,
        ]);
        logger.info(
          `[${route.method.toUpperCase()}] ${fullPath} [${controller.name}]`
        );
        app[route.method](fullPath, route.handler);
      });
    });
  });
}
