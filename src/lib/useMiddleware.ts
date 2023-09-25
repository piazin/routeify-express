import express from 'express';

/**
 * @description use middleware for controller method
 * @param middleware express.RequestHandler
 * @returns Function
 * @example
 * import { useMiddleware } from 'routeify-express';
 * import { Request, Response, NextFunction } from 'express';
 *
 * export class TestController {
 *  @useMiddleware((req: Request, res: Response, next: NextFunction) => {
 *    console.log('middleware');
 *    next();
 *  })
 *  get(req: Request, res: Response) {
 *    res.status(200).json({ msg: 'hello' });
 *  }
 * }
 */
export function useMiddleware(middleware: express.RequestHandler) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [req, res, next] = args;

      return middleware(req, res, () => originalMethod.apply(this, args));
    };
  };
}
