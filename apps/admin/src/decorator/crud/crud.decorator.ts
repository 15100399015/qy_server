// 引入自己的 controller 以及 dto
import { CrudController } from './crud.controller';
// 工具方法
import { get, merge } from 'lodash';
import { CrudOptionsWithModel } from './crud.interface';
import { CrudConfig } from './crud-config';
// 克隆元数据方法
import { cloneDecorators, clonePropDecorators } from './util';

// 支持的路由
const CRUD_ROUTES = {
  count: 'count',
  find: 'find',
  findOne: 'findOne',
  findAll: 'findAll',
  create: 'create',
  insertMany: 'insertMany',
  update: 'update',
  updateMany: 'updateMany',
  delete: 'delete',
  deleteMany: 'deleteMany',
};
const allMethods = Object.values(CRUD_ROUTES);
export const Crud = (options: CrudOptionsWithModel) => {
  // 合并配置
  options = merge({}, CrudConfig.options, options);
  // 返回真正的装饰器
  return (target) => {
    // 被装饰的controller
    const Controller = target;
    // controller 原型
    const controller = target.prototype;
    // 构建内部新的 crudController 实例
    const crudController = new CrudController(options.model);
    controller.crudOptions = options;

    // 过滤不需要的路由, 如果定义为false就剔除,留下允许被使用路由
    const methods = allMethods.filter(
      (v) => get(options, `routes.${v}`) !== false,
    );

    // 便遍历 路由
    for (let method of methods) {
      // 如果controller原型中存在此方法, 说明我们已经手动定义了则跳出
      if (controller[method]) continue;
      // 添加crud方法
      controller[method] = function (...args) {
        // 绑定我们自己的方法
        return crudController[method].apply(this, args);
      };

      // 合并元数据
      cloneDecorators(crudController, controller);
      cloneDecorators(crudController[method], controller[method]);
      clonePropDecorators(crudController, controller, method);
      clonePropDecorators(CrudController, Controller, method);

      // 添加用户定义的装饰器,1装饰器列表, 宿主,key,
      Reflect.decorate(
        [
          ...get(options, `decorators`, []),
          ...get(options, `routes.${method}.decorators`, []),
        ],
        controller,
        method,
        Reflect.getOwnPropertyDescriptor(controller, method),
      );
    }
  };
};
