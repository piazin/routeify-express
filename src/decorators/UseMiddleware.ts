import { LoggerType } from "@/enums/logger.enum";
import logger from "@/utils/logger";
import express from "express";

/**
 * @description use middleware for controller method
 * @param middleware express.RequestHandler
 * @returns Function
 */
export function UseMiddleware(middleware: express.RequestHandler) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    logger.info(
      `${LoggerType.MIDDLEWARE} ${middleware.name} [${target.constructor.name}.${propertyKey}]`
    );

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [req, res, next] = args;

      return middleware(req, res, () => originalMethod.apply(this, args));
    };
  };
}
