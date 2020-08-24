import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

export type mode = 'ObjectId' | 'document' | 'ObjectIdArray';
function verifIsObjectId(value: string): boolean {
  return isValidObjectId(value);
}
function verifIsObjectIdArray(idArray: string[]): boolean {
  return idArray.every((id) => isValidObjectId(id));
}
function verifDocument(value: any): boolean {
  return true;
}
@Injectable()
export class VerifyDtoPipe implements PipeTransform {
  constructor(private readonly mode: mode, private readonly key?: string) {}
  transform(value: any, metadata: ArgumentMetadata) {
    let _value = this.key !== undefined ? value[this.key] : value;
    if (this.mode === 'ObjectId') {
      if (!verifIsObjectId(_value)) {
        throw new BadRequestException('参数错误');
      }
    }
    if (this.mode === 'document') {
      if (!verifDocument(_value)) {
        throw new BadRequestException('参数错误');
      }
    }
    if (this.mode === 'ObjectIdArray') {
      if (!verifIsObjectIdArray(_value)) {
        throw new BadRequestException('参数错误');
      }
    }
    return _value;
  }
}
