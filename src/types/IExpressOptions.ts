import express from "express";

interface IExpressOptions {
  controllers: Function[];
  globalPrefix?: string;
  defaultExpressJson?: boolean;
  useGlobalMiddlewares?: express.RequestHandler[];
  useMiddlewaresAfterAll?: express.RequestHandler[];
}

export { IExpressOptions };
