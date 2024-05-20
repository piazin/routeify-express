import { ValidationError } from "class-validator";
import { StatusCodes } from "..";
import { HttpException } from "./http-exception";
import { parseExceptionName } from "@/utils/parseExceptionName";

export class BadRequestException extends HttpException {
  constructor(
    message?: string,
    { cause, description }: { cause?: Error; description?: string } = {}
  ) {
    super(
      message || parseExceptionName(BadRequestException.name),
      StatusCodes.BAD_REQUEST,
      {
        cause,
        description,
      }
    );
  }
}

export class UnauthorizedException extends HttpException {
  constructor(
    message?: string,
    { cause, description }: { cause?: Error; description?: string } = {}
  ) {
    super(
      message || parseExceptionName(UnauthorizedException.name),
      StatusCodes.UNAUTHORIZED,
      {
        cause,
        description,
      }
    );
  }
}

export class ForbiddenException extends HttpException {
  constructor(
    message?: string,
    { cause, description }: { cause?: Error; description?: string } = {}
  ) {
    super(
      message || parseExceptionName(ForbiddenException.name),
      StatusCodes.FORBIDDEN,
      {
        cause,
        description,
      }
    );
  }
}

export class NotFoundException extends HttpException {
  constructor(
    message?: string,
    { cause, description }: { cause?: Error; description?: string } = {}
  ) {
    super(
      message || parseExceptionName(NotFoundException.name),
      StatusCodes.NOT_FOUND,
      {
        cause,
        description,
      }
    );
  }
}

export class MethodNotAllowedException extends HttpException {
  constructor(
    message?: string,
    { cause, description }: { cause?: Error; description?: string } = {}
  ) {
    super(
      message || parseExceptionName(MethodNotAllowedException.name),
      StatusCodes.METHOD_NOT_ALLOWED,
      { cause, description }
    );
  }
}

export class ConflictException extends HttpException {
  constructor(
    message?: string,
    { cause, description }: { cause?: Error; description?: string } = {}
  ) {
    super(
      message || parseExceptionName(ConflictException.name),
      StatusCodes.CONFLICT,
      {
        cause,
        description,
      }
    );
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(
    message?: string,
    { cause, description }: { cause?: Error; description?: string } = {}
  ) {
    super(
      message || parseExceptionName(InternalServerErrorException.name),
      StatusCodes.INTERNAL_SERVER_ERROR,
      { cause, description }
    );
  }
}

export class NotImplementedException extends HttpException {
  constructor(
    message?: string,
    { cause, description }: { cause?: Error; description?: string } = {}
  ) {
    super(
      message || parseExceptionName(NotImplementedException.name),
      StatusCodes.NOT_IMPLEMENTED,
      { cause, description }
    );
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(
    message?: string,
    { cause, description }: { cause?: Error; description?: string } = {}
  ) {
    super(
      message || parseExceptionName(ServiceUnavailableException.name),
      StatusCodes.SERVICE_UNAVAILABLE,
      { cause, description }
    );
  }
}

export class GatewayTimeoutException extends HttpException {
  constructor(
    message?: string,
    { cause, description }: { cause?: Error; description?: string } = {}
  ) {
    super(
      message || parseExceptionName(GatewayTimeoutException.name),
      StatusCodes.GATEWAY_TIMEOUT,
      { cause, description }
    );
  }
}

export class RequestTimeoutException extends HttpException {
  constructor(
    message?: string,
    { cause, description }: { cause?: Error; description?: string } = {}
  ) {
    super(
      message || parseExceptionName(RequestTimeoutException.name),
      StatusCodes.REQUEST_TIMEOUT,
      { cause, description }
    );
  }
}

export class LengthRequiredException extends HttpException {
  constructor(
    message?: string,
    { cause, description }: { cause?: Error; description?: string } = {}
  ) {
    super(
      message || parseExceptionName(LengthRequiredException.name),
      StatusCodes.LENGTH_REQUIRED,
      { cause, description }
    );
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(
    message?: string,
    { cause, description }: { cause?: Error; description?: string } = {}
  ) {
    super(
      message || parseExceptionName(TooManyRequestsException.name),
      StatusCodes.TOO_MANY_REQUESTS,
      { cause, description }
    );
  }
}

export class ValidationException extends Error {
  public readonly errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super();
    this.errors = errors;
  }

  public parseError() {
    let messages: string[];

    for (const error of this.errors) {
      messages = Object.values(error.constraints);
    }

    return {
      statusCode: StatusCodes.BAD_REQUEST,
      errors: "Bad Request",
      message: messages,
    };
  }
}
