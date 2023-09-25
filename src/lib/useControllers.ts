import express from 'express';
import storagemetadata from '../storagemetadata';
const { storageControllerMetadata } = storagemetadata;

export function useControllers(
  controllers: Function[],
  app: express.Application,
  prefix: string = ''
) {
  controllers.forEach((controller) => {
    const routesOfController = storageControllerMetadata.get(controller.name);

    routesOfController.forEach((routeOfController) => {
      routeOfController.routes.forEach((route) => {
        app[route.method](
          `/${prefix}${routeOfController.baseRouter}${route.routePath}`,
          route.handler
        );
      });
    });
  });
}
