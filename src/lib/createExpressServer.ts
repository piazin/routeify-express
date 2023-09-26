import express from 'express';
import { useControllers } from './useControllers';
import { useMiddlewares } from './useMiddlewares';
import { standardizeGlobalPrefix } from 'src/utils/standardizeGlobalPrefix';

interface ExpressOptions {
  controllers: Function[];
  globalPrefix?: string;
  defaultExpressJson?: boolean;
  useGlobalMiddlewares?: express.RequestHandler[];
  useMiddlewaresAfterAll?: express.RequestHandler[];
}

/**
 * @description create express server
 * @param options ExpressOptions
 * @returns express.Application
 */
export function createExpressServer(options: ExpressOptions) {
  const app = express();
  const { controllers, globalPrefix, defaultExpressJson } = options;

  useMiddlewares({ app, middlewares: options.useGlobalMiddlewares, defaultExpressJson });
  const prefix = standardizeGlobalPrefix(globalPrefix);
  useControllers(controllers, app, prefix);
  useMiddlewares({ app, middlewares: options.useMiddlewaresAfterAll });

  return app;
}
