import { applyMetadataToStorage } from '@utils';

/**
 * @description decorator for post method
 * @param routePath string
 * @returns Function
 */
export function Put(routePath: string = '') {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    applyMetadataToStorage(key, routePath, 'put');
  };
}
