import { applyMetadataToStorage } from "@/utils/applyMetadataToStorage";
import { wrapWithTryCatch } from "@/utils/wrapWithTryCatch";

/**
 * @description decorator for post method
 * @param routePath string
 * @returns Function
 */
export function Put(routePath: string = "") {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    wrapWithTryCatch(descriptor);
    applyMetadataToStorage(key, routePath, "put");
  };
}
