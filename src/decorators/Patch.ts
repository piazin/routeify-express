import { applyMetadataToStorage } from '@utils';

/**
 * @description Decorator for patch method
 * @param {string} routePath
 */
export function Patch(routePath: string = '') {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    applyMetadataToStorage(key, routePath, 'patch');
  };
}
