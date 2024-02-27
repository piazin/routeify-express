import express from "express";
import { IExpressOptions } from "@types";
import { Express } from "express";
import { useControllers } from "./useControllers";
import { useMiddlewares } from "./useMiddlewares";
import { standardizeGlobalPrefix } from "@utils";

/**
 * @description create express server
 * @param options IExpressOptions
 * @returns express.Application
 */
export function createExpressServer(options: IExpressOptions): Express {
  const app = express();
  const { controllers, globalPrefix, defaultExpressJson } = options;

  useMiddlewares({
    app,
    middlewares: options.useGlobalMiddlewares,
    defaultExpressJson,
  });
  const prefix = standardizeGlobalPrefix(globalPrefix);
  useControllers(controllers, app, prefix);
  useMiddlewares({ app, middlewares: options.useMiddlewaresAfterAll });

  return app;
}
