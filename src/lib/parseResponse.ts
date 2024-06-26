export function parseResponse(descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const [req, res] = args;
    try {
      const result = await originalMethod.apply(this, args);

      if (res.headersSent) {
        return;
      }

      if (typeof result === "object") {
        return res.json(result).end();
      }

      return res.send(result).end();
    } catch (err) {
      throw err;
    }
  };

  return descriptor;
}
