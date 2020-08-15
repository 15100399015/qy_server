import { CrudOptions } from './crud.interface';

export class CrudConfig {
  public static options: CrudOptions = {
    routes: {
      deleteMany: false,
      insertMany: false,
      updateMany: false,
    },
  };
}
