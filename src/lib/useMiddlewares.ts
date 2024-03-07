import express from "express";
import { IUseMiddlewares } from "@types";

export function useMiddlewares({
  app,
  middlewares,
  defaultExpressJson,
}: IUseMiddlewares) {
  if (defaultExpressJson)
    app.use(express.json(), express.urlencoded({ extended: true }));

  if (!middlewares) return;
  for (const middleware of middlewares) {
    app.use(middleware);
  }
}
