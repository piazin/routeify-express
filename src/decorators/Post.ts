import { parseResponse } from "@/lib/parseResponse";
import { applyMetadataToStorage } from "@/utils/applyMetadataToStorage";
import { wrapWithTryCatch } from "@/utils/wrapWithTryCatch";

/**
 * @description decorator for post method
 * @param routePath string
 * @returns Function
 */
export function Post(routePath: string = "") {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    parseResponse(descriptor);
    wrapWithTryCatch(descriptor);
    applyMetadataToStorage(key, routePath, "post");

    return descriptor;
  };
}
