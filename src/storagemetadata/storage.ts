import { IRouteMetadataController, IRouteMetadata } from '@types';

const storageControllerMetadata = new Map<string, IRouteMetadataController[]>();
const storageMethodMetadata = new Map<string, IRouteMetadata>();

export default Object.freeze({
  storageControllerMetadata,
  storageMethodMetadata,
});
