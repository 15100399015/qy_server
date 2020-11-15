import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";
import { isValidObjectId } from "mongoose";
import { plainToClass } from "class-transformer";
import { validate, ValidatorOptions } from "class-validator";
import { _403, _tcrs } from "@util/concise-exception";
import { REULTCODES } from "@admin/constant";

export type mode = "ObjectId" | "document" | "ObjectIds";

// 验证过id
function verifIsObjectId(value: string): boolean {
  return isValidObjectId(value);
}
// 验证id数组
function verifIsObjectIds(idArray: string[]): boolean {
  return idArray.every((id) => isValidObjectId(id));
}
// 验证文档
async function verifDocument(value: any, docCls: any, validatorOptions: ValidatorOptions): Promise<boolean> {
  const errors = await validate(plainToClass(docCls, value), Object.assign({ whitelist: true, forbidUnknownValues: true }, validatorOptions));
  return errors.length <= 0;
}

// pipe
@Injectable()
export class VerifyDtoPipe implements PipeTransform {
  constructor(private readonly mode: mode, private readonly doc?: Object, private readonly validatorOptions?: ValidatorOptions) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const { mode, doc, validatorOptions } = this;
    if (mode === "ObjectId" && !verifIsObjectId(value)) throw _tcrs(REULTCODES.DATA_IS_WRONG, "ObjectId验证错误");
    if (mode === "document" && !(await verifDocument(value, doc, validatorOptions))) throw _tcrs(REULTCODES.DATA_IS_WRONG, "Dto错误");
    if (mode === "ObjectIds" && !verifIsObjectIds(value)) throw _tcrs(REULTCODES.DATA_IS_WRONG, "ObjectId数组验证错误");
    return value;
  }
}
