import { IRouteMetadataController } from '@types';
import { storageControllerMetadata, storageMethodMetadata } from '@storage';

/**
 * @description decorator for controller
 * @param routePrefix string
 * @returns Function
 */
export function Controller(routePrefix: string) {
  return (target: any) => {
    const propertyNames = Object.getOwnPropertyNames(target.prototype).filter(
      (item) => item !== 'constructor'
    );

    const routesOfController: IRouteMetadataController[] = [];

    for (const propertyName of propertyNames) {
      const route = storageMethodMetadata.get(propertyName);
      if (route) {
        const handler = target.prototype[propertyName];

        routesOfController.push({ baseRouter: routePrefix, routes: [{ ...route, handler }] });
      }
    }

    storageControllerMetadata.set(target.name, routesOfController);
  };
}
