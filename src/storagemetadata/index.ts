import { RouteMetadataController, RouteMetadata } from '../types';

const storageControllerMetadata = new Map<string, RouteMetadataController[]>();
const storageMethodMetadata = new Map<string, RouteMetadata>();

export default Object.freeze({
  storageControllerMetadata,
  storageMethodMetadata,
});
