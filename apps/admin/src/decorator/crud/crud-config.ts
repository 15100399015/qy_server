import { CrudOptions } from "./crud.interface";

export class CrudConfig {
  public static options: CrudOptions = {
    routes: {
      count: false,
      find: false,
      findOne: false,
      findAll: false,
      create: false,
      insertMany: false,
      update: false,
      updateMany: false,
      delete: false,
      deleteMany: false,
    },
  };
}
