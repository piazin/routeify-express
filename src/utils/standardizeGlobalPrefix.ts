export function standardizeGlobalPrefix(prefix: string) {
  let standardizedPrefix = '';
  if (prefix) {
    standardizedPrefix = `${prefix.replace('/', '')}/`;
  }
  return standardizedPrefix;
}
