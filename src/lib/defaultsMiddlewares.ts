import { RequestHandler, ErrorRequestHandler } from "express";
import { StatusCodes, ValidationException } from "..";
import { logger } from "@/utils";
import { HttpException } from "@/exceptions/http-exception";

export const notFoundResource: RequestHandler = (req, res) =>
  res.status(StatusCodes.NOT_FOUND).json({
    message: `Cannot ${req.method} ${req.path}`,
    status: StatusCodes.NOT_FOUND,
  });

export const internalServerError: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err instanceof HttpException) {
    logger.error(err.message, `[${HttpException.name}]`);
    return res.status(err.statusCode).json(err.parseError());
  }

  if (err instanceof ValidationException) {
    logger.error(err.message, `[${ValidationException.name}]`);
    return res.status(StatusCodes.BAD_REQUEST).json(err.parseError());
  }

  logger.error(err.message, err.stack);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  });
};
