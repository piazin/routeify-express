import logger from "./logger";
import { StatusCodes } from "..";
import { HttpException } from "@/exceptions/http-exception";

export function wrapWithTryCatch(descriptor: PropertyDescriptor): boolean {
  const originalMethod = descriptor.value;
  let stop = false;

  descriptor.value = async function (...args: any[]) {
    const [req, res] = args;
    try {
      await originalMethod.apply(this, args);
    } catch (err) {
      stop = true;
      if (err instanceof HttpException) {
        logger.error(err.message, `[${HttpException.name}]`);
        return res.status(err.statusCode).json(err.parseError());
      }

      logger.error(err.message, err.stack);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  };

  return stop;
}
