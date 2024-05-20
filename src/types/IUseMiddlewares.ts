import express from "express";

interface IUseMiddlewares {
  app: express.Application;
  defaultExpressJson?: boolean;
  middlewares?: express.RequestHandler[] | express.ErrorRequestHandler[];
}

export { IUseMiddlewares };
