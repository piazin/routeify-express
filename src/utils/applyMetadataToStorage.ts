import { storageMethodMetadata } from "@storage";

export function applyMetadataToStorage(
  key: string,
  routePath: string,
  method: "get" | "post" | "put" | "delete" | "patch"
) {
  const isMethodExist = storageMethodMetadata.get(key);
  if (isMethodExist) {
    isMethodExist.routePath = routePath;
    isMethodExist.method = method;
    return;
  } else {
    storageMethodMetadata.set(key, { routePath, method });
  }
}
