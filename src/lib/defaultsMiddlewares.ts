import { RequestHandler } from "express";
import { StatusCodes } from "..";

export const notFoundResource: RequestHandler = (req, res) =>
  res.status(StatusCodes.NOT_FOUND).json({
    message: `Cannot ${req.method} ${req.path}`,
    status: StatusCodes.NOT_FOUND,
  });
