import storage from '../storagemetadata';
const { storageMethodMetadata } = storage;
import { standardizeRoutes } from './standardizeRoutes';

export function applyMetadataToStorage(
  key: string,
  routePath: string,
  method: 'get' | 'post' | 'put' | 'delete'
) {
  const isMethodExist = storageMethodMetadata.get(key);
  if (isMethodExist) {
    isMethodExist.routePath = standardizeRoutes(routePath);
    isMethodExist.method = method;
    return;
  } else {
    storageMethodMetadata.set(key, { routePath: standardizeRoutes(routePath), method });
  }
}
