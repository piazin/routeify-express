export function standardizeControllerPrefix(prefix: string) {
  if (!prefix) return "";
  if (prefix?.startsWith("/")) return prefix.replace("/", "");
  return prefix;
}
