export function verifyRoutePath(routePath: string) {
  if (routePath[0] !== '/') {
    routePath = `/${routePath}`;
  }
  return routePath;
}
