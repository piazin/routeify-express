import storage from '../storagemetadata';
const { storageMethodMetadata } = storage;
import { verifyRoutePath } from '../utils/verifyRoutePath';

/**
 * @description decorator for delete method
 * @param routePath string
 * @returns Function
 */
export function Delete(routePath: string) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    storageMethodMetadata.set(key, { routePath: verifyRoutePath(routePath), method: 'delete' });
  };
}
