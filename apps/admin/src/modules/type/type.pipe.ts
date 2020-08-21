import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import {} from 'class-transformer';
import {} from 'class-validator';

@Injectable()
export class TypePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
