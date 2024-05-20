import { Application } from "express";

interface IRouteMetadata {
  routePath: string;
  method: "get" | "post" | "put" | "delete" | "patch";
}

interface IRouteMetadataMethod extends IRouteMetadata {
  handler: Application;
}

interface IRouteMetadataController {
  baseRouter: string;
  routes: IRouteMetadataMethod[];
}

export { IRouteMetadata, IRouteMetadataController, IRouteMetadataMethod };
