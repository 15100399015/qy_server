import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { isValidObjectId } from "mongoose";
import { plainToClass } from "class-transformer";
import { validate, ValidatorOptions } from "class-validator";

export type mode = "ObjectId" | "document" | "ObjectIdArray";

// 验证过id
function verifIsObjectId(value: string): boolean {
  return isValidObjectId(value);
}
// 验证id数组
function verifIsObjectIdArray(idArray: string[]): boolean {
  return idArray.every((id) => isValidObjectId(id));
}
// 验证文档
async function verifDocument(value: any, docCls: any, validatorOptions: ValidatorOptions): Promise<boolean> {
  const errors = await validate(plainToClass(docCls, value, Object.assign({ whitelist: true } as ValidatorOptions, validatorOptions)));
  console.log(errors);
  return errors.length <= 0;
}
@Injectable()
export class VerifyDtoPipe implements PipeTransform {
  constructor(private readonly mode: mode, private readonly key: "self" | string, private readonly doc?: Object, private readonly validatorOptions?: ValidatorOptions) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const { mode, key, doc, validatorOptions } = this;
    const _value = key === "self" ? value : value[key];
    if (mode === "ObjectId") {
      if (!verifIsObjectId(_value)) {
        throw new BadRequestException("验证id错误");
      }
    }
    if (mode === "document") {
      if (!(await verifDocument(_value, doc, validatorOptions))) {
        throw new BadRequestException("doc错误");
      }
    }
    if (mode === "ObjectIdArray") {
      if (!verifIsObjectIdArray(_value)) {
        throw new BadRequestException("id数组验证错误");
      }
    }
    return _value;
  }
}
