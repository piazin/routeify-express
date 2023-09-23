import storage from '../storagemetadata';
const { storageMethodMetadata } = storage;
import { verifyRoutePath } from 'src/utils/verifyRoutePath';

/**
 * @description decorator for get method
 * @param routePath string
 * @returns Function
 */
export function Get(routePath: string = '') {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    storageMethodMetadata.set(key, { routePath: verifyRoutePath(routePath), method: 'get' });
  };
}
