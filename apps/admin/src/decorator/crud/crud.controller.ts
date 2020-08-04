import { Model } from 'mongoose';
import {
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { CrudQuery, ICrudQuery } from './crud-query.decorator';
import { defaultPaginate } from './crud-config';
import { get } from 'lodash';
import { CrudOptionsWithModel, PaginateKeys } from './crud.interface';
import { DiyHttpException } from './util';

export class CrudPlaceholderDto {}
// controller
export class CrudController {
  constructor(
    public model: Model<{} | any>,
    public crudOptions?: CrudOptionsWithModel,
  ) {}
  // 获取总数
  @ApiOperation({ summary: 'count a record' })
  @Get('count')
  count(): Promise<number> {
    return this.model.countDocuments().exec();
  }
  // 查找
  @ApiQuery({
    name: 'query',
    type: String,
    required: false,
    description: 'Query options',
  })
  @ApiOperation({ summary: 'Find all records' })
  @Get('find')
  find(@CrudQuery('query') query: ICrudQuery = {}) {
    let {
      where = get(this.crudOptions, 'routes.find.where', {}),
      limit = get(this.crudOptions, 'routes.find.limit', 10),
      page = 1,
      skip = 0,
      populate = get(this.crudOptions, 'routes.find.populate', undefined),
      sort = get(this.crudOptions, 'routes.find.sort', undefined),
    } = query;
    if (skip < 1) {
      skip = (page - 1) * limit;
    }
    const paginateKeys: PaginateKeys | false = get(
      this.crudOptions,
      'routes.find.paginate',
      defaultPaginate,
    );

    const find = async () => {
      const data = await this.model
        .find()
        .where(where)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .populate(populate);
      if (paginateKeys !== false) {
        const total = await this.model.countDocuments(where);
        return {
          [paginateKeys.total]: total,
          [paginateKeys.data]: data,
          [paginateKeys.lastPage]: Math.ceil(total / limit),
          [paginateKeys.currentPage]: page,
          [paginateKeys.limit]: data.length,
        };
      }
      return data;
    };
    return find();
  }
  // 单个查找
  @ApiQuery({
    name: 'conditions',
    type: Object,
    required: true,
    description: 'Conditions options',
  })
  @ApiOperation({ summary: 'findOne all records' })
  @Get('findOne')
  async findOne(@CrudQuery('conditions') conditions: any) {
    return this.model.findOne(conditions).exec();
  }
  // 创建数据
  @ApiOperation({ summary: 'Create a record' })
  @Post('create')
  async create(@Body() body: CrudPlaceholderDto) {
    const transform = get(this.crudOptions, 'routes.create.transform');
    if (transform) {
      body = transform(body);
    }
    return this.model.create(body).catch(err => {
      throw new DiyHttpException(HttpStatus.BAD_REQUEST, err);
    });
  }
  // 插入多个
  @ApiOperation({ summary: 'InsertMany a record' })
  @Post('insertMany')
  async insertMany(@Body() body: CrudPlaceholderDto) {
    return this.model
      .insertMany(body, {
        ordered: false,
        rawResult: false,
      })
      .catch(err => {
        throw new DiyHttpException(HttpStatus.BAD_REQUEST, err);
      });
  }
  // 根据id更新一条数据
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOperation({ summary: 'Update a record' })
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() body: CrudPlaceholderDto) {
    const transform = get(this.crudOptions, 'routes.update.transform');
    if (transform) {
      body = transform(body);
    }
    return this.model
      .findByIdAndUpdate(id, body, {
        new: true,
        upsert: false,
        runValidators: true,
      })
      .catch(err => {
        throw new DiyHttpException(HttpStatus.BAD_REQUEST, err);
      });
  }
  // 更新多个
  @ApiOperation({ summary: 'UpdateMany a record' })
  @Put('updateMany')
  updateMany(
    @Body('conditions') conditions: any,
    @Body('doc') doc: CrudPlaceholderDto,
  ) {
    return this.model.updateMany(conditions, doc).catch(err => {
      throw new DiyHttpException(HttpStatus.BAD_REQUEST, err);
    });
  }
  // 根据id删除一条数据
  @ApiQuery({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOperation({ summary: 'Delete a record' })
  @Delete('delete')
  delete(@Query('id') id: string) {
    return this.model.findByIdAndRemove(id).catch(err => {
      throw new DiyHttpException(HttpStatus.BAD_REQUEST, err);
    });
  }
  // 删除多个
  @ApiOperation({ summary: 'DeleteMany a record' })
  @Delete('deleteMany')
  deleteMany(@Body('conditions') conditions: any) {
    return this.model.deleteMany(conditions).exec();
  }
}
