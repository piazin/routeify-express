import storage from '../storagemetadata';
const { storageMethodMetadata } = storage;
import { verifyRoutePath } from '../utils/verifyRoutePath';

/**
 * @description decorator for post method
 * @param routePath string
 * @returns Function
 */
export function Post(routePath: string = '') {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    storageMethodMetadata.set(key, { routePath: verifyRoutePath(routePath), method: 'post' });
  };
}
