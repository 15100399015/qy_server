export interface CrudRoute {
  decorators?: MethodDecorator[];
}
export interface CrudRouteWithDto extends CrudRoute {
  dto?: any;
  transform?: (data: any) => any;
}

export interface CrudRoutes {
  count?: false;
  find?: CrudRoute | false;
  findOne?: CrudRoute | false;
  findAll?: CrudRoute | false;
  create?: CrudRouteWithDto | false;
  insertMany?: CrudRouteWithDto | false;
  update?: CrudRouteWithDto | false;
  updateMany?: CrudRouteWithDto | false;
  delete?: CrudRoute | false;
  deleteMany?: CrudRoute | false;
}
export interface CrudOptions {
  routes?: CrudRoutes;
  decorators?: Function[];
}

export interface CrudOptionsWithModel extends CrudOptions {
  model: any;
}
