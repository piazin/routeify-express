import { Application } from 'express';

interface RouteMetadata {
  routePath: string;
  method: 'get' | 'post' | 'put' | 'delete';
}

interface RouteMetadataMethod extends RouteMetadata {
  handler: Application;
}

interface RouteMetadataController {
  baseRouter: string;
  routes: RouteMetadataMethod[];
}

export { RouteMetadata, RouteMetadataController, RouteMetadataMethod };
