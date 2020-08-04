import { CrudOptions } from './crud.interface';

export const defaultPaginate = {
  // 数据
  data: 'data',
  // 总数
  total: 'total',
  // 共多少页
  lastPage: 'lastPage',
  // 当前第几页
  currentPage: 'page',
  // 每页多少数据
  limit: 'limit',
};

export class CrudConfig {
  public static options: CrudOptions = {
    routes: {
      find: {
        paginate: { ...defaultPaginate },
      },
      deleteMany: false,
      insertMany: false,
      updateMany: false,
    },
  };
}
