export interface CrudRoute {
  decorators?: MethodDecorator[];
}
export interface CrudRouteWithDto extends CrudRoute {
  transform?: (data: any) => any;
}

export interface CrudRoutes {
  count?: boolean;
  find?: CrudRoute | boolean;
  findOne?: CrudRoute | boolean;
  findAll?: CrudRoute | boolean;
  create?: CrudRouteWithDto | boolean;
  insertMany?: CrudRouteWithDto | boolean;
  update?: CrudRouteWithDto | boolean;
  updateMany?: CrudRouteWithDto | boolean;
  delete?: CrudRoute | boolean;
  deleteMany?: CrudRoute | boolean;
}
export interface CrudOptions {
  routes?: CrudRoutes;
  decorators?: Function[];
}

export interface CrudOptionsWithModel extends CrudOptions {
  model: any;
}
