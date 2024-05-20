/**
 * @description Decorator to set the status code of the response
 * @param code number
 * @returns Function
 */
export function Status(code: number) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const [req, res] = args;
      res.status(code);
      const result = await originalMethod.apply(this, args);
      return result;
    };
  };
}
