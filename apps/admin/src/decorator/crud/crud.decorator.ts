// 引入自己的 controller 以及 dto
import { CrudController, CrudPlaceholderDto } from './crud.controller';
import { PARAMTYPES_METADATA } from '@nestjs/common/constants';
// 工具方法
import { get, merge } from 'lodash';
import { CrudOptionsWithModel } from './crud.interface';
import { CrudConfig } from './crud-config';
// 克隆元数据方法
import { cloneDecorators, clonePropDecorators } from './util';
import { ApiBody } from '@nestjs/swagger';

// 支持的路由
const CRUD_ROUTES = {
  count: 'count',
  find: 'find',
  findOne: 'findOne',
  create: 'create',
  insertMany: 'insertMany',
  update: 'update',
  updateMany: 'updateMany',
  delete: 'delete',
  deleteMany: 'deleteMany',
};
const allMethods = Object.values(CRUD_ROUTES);
export const Crud = (options: CrudOptionsWithModel) => {
  // 合并配置 大概就是将默认配置和自定义配置合并起来
  options = merge({}, CrudConfig.options, options);
  return target => {
    // 被装饰controller
    const Controller = target;
    // controller 原型
    const controller = target.prototype;
    // 构建内部新的 crudController 实例
    const crudController = new CrudController(options.model);
    controller.crudOptions = options;

    // 过滤不需要的路由, 如果定义为false就剔除,留下允许被使用路由
    const methods = allMethods.filter(
      v => get(options, `routes.${v}`) !== false,
    );

    // 便遍历 路由
    for (let method of methods) {
      // 如果controller原型中存在此方法, 说明我们已经手动定义了则跳出
      if (controller[method]) continue;
      // 添加crud方法
      controller[method] = function(...args) {
        return crudController[method].apply(this, args);
      };

      // 合并元数据
      cloneDecorators(crudController, controller);
      cloneDecorators(crudController[method], controller[method]);
      clonePropDecorators(crudController, controller, method);
      clonePropDecorators(CrudController, Controller, method);

      // 获取参数元数据 / key 宿主 原型key
      const types: [] = Reflect.getMetadata(
        PARAMTYPES_METADATA,
        controller,
        method,
      );

      const _ApiBody = types
        .map((v: any) => {
          if (get(v, 'name') === CrudPlaceholderDto.name) {
            return ApiBody({
              type: get(options, `routes.${method}.dto`, options.model),
            });
          }
        })
        .filter(item => item && item);

      // 添加用户定义的装饰器,1装饰器列表, 宿主,key,
      Reflect.decorate(
        [..._ApiBody, ...get(options, `rgoutes.${method}.decorators`, [])],
        controller,
        method,
        Reflect.getOwnPropertyDescriptor(controller, method),
      );
    }
  };
};
