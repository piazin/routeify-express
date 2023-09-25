export function standardizeRoutes(routePath: string) {
  if (routePath[0] !== '/') {
    routePath = `/${routePath}`;
  }
  return routePath;
}
