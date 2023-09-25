import express from 'express';

export function useGlobalMiddlewares(
  app: express.Application,
  middlewares: express.RequestHandler[]
) {
  app.use(express.json(), express.urlencoded({ extended: true }));

  for (const middleware of middlewares) {
    app.use(middleware);
  }
}
