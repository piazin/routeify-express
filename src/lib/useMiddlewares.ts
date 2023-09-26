import express from 'express';

interface UseMiddlewares {
  app: express.Application;
  defaultExpressJson?: boolean;
  middlewares?: express.RequestHandler[];
}

export function useMiddlewares({ app, middlewares, defaultExpressJson }: UseMiddlewares) {
  if (defaultExpressJson) app.use(express.json(), express.urlencoded({ extended: true }));

  if (!middlewares) return;
  for (const middleware of middlewares) {
    app.use(middleware);
  }
}
