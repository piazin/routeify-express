import express, { Express } from "express";
import { IExpressOptions } from "@types";
import { useControllers } from "./useControllers";
import { useMiddlewares } from "./useMiddlewares";
import { internalServerError, notFoundResource } from "./defaultsMiddlewares";

/**
 * @description create express server
 * @param options IExpressOptions
 * @returns express.Application
 */
export function createExpressServer(options: IExpressOptions): Express {
  const app = express();
  const {
    controllers,
    globalPrefix,
    defaultExpressJson,
    useMiddlewaresAfterAll,
  } = options;

  useMiddlewares({
    app,
    middlewares: options.useGlobalMiddlewares,
    defaultExpressJson,
  });
  useControllers(controllers, app, globalPrefix);

  // default middlewares after all
  useMiddlewares({ app, middlewares: useMiddlewaresAfterAll });
  useMiddlewares({ app, middlewares: [notFoundResource] });
  useMiddlewares({ app, middlewares: [internalServerError] });

  return app;
}
