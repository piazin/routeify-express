import express from 'express';
import storage from '../storagemetadata';
const { storageControllerMetadata } = storage;

interface ExpressOptions {
  controllers: Function[];
  globalPrefix?: string;
  useMiddlewares?: express.RequestHandler[];
}

/**
 * @description create express server
 * @param options ExpressOptions
 * @returns express.Application
 */
export function createExpressServer(options: ExpressOptions) {
  const app = express();
  app.use(express.json(), express.urlencoded({ extended: true }));

  for (const middleware of options.useMiddlewares || []) {
    app.use(middleware);
  }

  const { controllers, globalPrefix } = options;
  let prefix = '';

  if (globalPrefix) {
    prefix = `${globalPrefix.replace('/', '')}/`;
  }

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

  return app;
}
