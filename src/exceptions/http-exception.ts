import { StatusCodes } from "..";

export class HttpException extends Error {
  public readonly statusCode: StatusCodes | number;
  public readonly cause?: Error;
  public readonly description?: string;

  constructor(
    message?: string,
    statusCode?: StatusCodes | number,
    { cause, description }: { cause?: Error; description?: string } = {
      description: message,
    }
  ) {
    super(message);
    this.statusCode = statusCode;
    this.cause = cause;
    this.description = description;
  }

  public parseError() {
    return {
      message: this.message,
      status: this.statusCode,
      error: this.description,
    };
  }
}
