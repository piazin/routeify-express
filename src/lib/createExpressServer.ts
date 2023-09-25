import express from 'express';
import { useControllers } from './useControllers';
import { useGlobalMiddlewares } from './useGlobalMiddlewares';
import { standardizeGlobalPrefix } from 'src/utils/standardizeGlobalPrefix';

interface ExpressOptions {
  controllers: Function[];
  globalPrefix?: string;
  useGlobalMiddlewares?: express.RequestHandler[];
}

/**
 * @description create express server
 * @param options ExpressOptions
 * @returns express.Application
 */
export function createExpressServer(options: ExpressOptions) {
  const app = express();
  const { controllers, globalPrefix } = options;

  useGlobalMiddlewares(app, options.useGlobalMiddlewares);
  const prefix = standardizeGlobalPrefix(globalPrefix);
  useControllers(controllers, app, prefix);

  return app;
}
