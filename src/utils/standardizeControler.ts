export function standardizeControllerPrefix(prefix: string) {
  if (prefix?.startsWith("/")) return prefix.replace("/", "");
  return prefix;
}
