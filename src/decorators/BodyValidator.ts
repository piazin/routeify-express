import { logger } from "@utils";
import { validate } from "class-validator";
import { StatusCodes, ValidationException } from "..";

/**
 * @description validate request body using class-validator
 * @param classValidator class
 * @param options { enableErrLogs: boolean = false }
 * @returns Function
 */
export function BodyValidator(
  classValidator: any,
  options: { enableErrLogs: boolean } = { enableErrLogs: false }
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const [req, res, next] = args;

      const instance = new classValidator();
      Object.keys(req.body).forEach((key) => {
        instance[key] = req.body[key];
      });

      const errors = await validate(instance);
      if (errors.length > 0) {
        if (options?.enableErrLogs)
          logger.error(
            `${ValidationException.name} [${target.constructor.name}.${propertyKey}]`
          );

        const validatorExeception = new ValidationException(errors);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(validatorExeception.parseError());
      }

      return originalMethod.apply(this, args);
    };
  };
}
