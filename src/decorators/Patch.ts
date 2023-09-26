import { applyMetadataToStorage } from 'src/utils/applyMetadataToStorage';

export function Patch(routePath: string = '') {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    applyMetadataToStorage(key, routePath, 'patch');
  };
}
