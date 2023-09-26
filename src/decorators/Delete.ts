import { applyMetadataToStorage } from 'src/utils/applyMetadataToStorage';

/**
 * @description decorator for delete method
 * @param routePath string
 * @returns Function
 */
export function Delete(routePath: string = '') {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    applyMetadataToStorage(key, routePath, 'delete');
  };
}
