import { applyMetadataToStorage } from '@utils';

/**
 * @description decorator for get method
 * @param routePath string
 * @returns Function
 */
export function Get(routePath: string = '') {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    applyMetadataToStorage(key, routePath, 'get');
  };
}
