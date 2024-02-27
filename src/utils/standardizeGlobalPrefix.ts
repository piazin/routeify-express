export function standardizeGlobalPrefix(prefix: string) {
  if (!prefix) prefix = "/";
  if (!prefix?.startsWith("/")) prefix = `/${prefix}`;
  if (!prefix?.endsWith("/")) prefix = `${prefix}/`;

  return prefix;
}
