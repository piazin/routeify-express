import express from 'express';
import storage from '../storagemetadata';
const { storageControllerMetadata } = storage;

interface ExpressOptions {
  controllers: Function[];
}

/**
 * @description create express server
 * @param options ExpressOptions
 * @returns express.Application
 */
export function createExpressServer(options: ExpressOptions) {
  const app = express();
  app.use(express.json(), express.urlencoded({ extended: true }));

  options.controllers.forEach((controller) => {
    const routesOfController = storageControllerMetadata.get(controller.name);

    routesOfController.forEach((routeOfController) => {
      routeOfController.routes.forEach((route) => {
        app[route.method](`/${routeOfController.baseRouter}${route.routePath}`, route.handler);
      });
    });
  });

  return app;
}
