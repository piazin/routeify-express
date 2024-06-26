import { parseResponse } from "@/lib/parseResponse";
import { applyMetadataToStorage } from "@/utils/applyMetadataToStorage";
import { wrapWithTryCatch } from "@/utils/wrapWithTryCatch";

/**
 * @description Decorator for patch method
 * @param {string} routePath
 * @returns Function
 */
export function Patch(routePath: string = "") {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    parseResponse(descriptor);
    wrapWithTryCatch(descriptor);
    applyMetadataToStorage(key, routePath, "patch");

    return descriptor;
  };
}
