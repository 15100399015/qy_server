import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class VerificationService {
  constructor(@InjectConnection() private connection: Connection) {}
  // 检查单个是否存在
  async testOneExist(
    callName: string,
    key: string,
    val: any,
  ): Promise<boolean> {
    return await this.connection.collection(callName).findOne({
      [key]: val,
    });
  }
  // 检查是否全部存在
  async testAllExist(
    callName: string,
    key: string,
    valArr: any[],
  ): Promise<boolean> {
    const resNum: number = await this.connection
      .collection(callName)
      .find({
        [key]: { $in: valArr },
      })
      .count();
    if (resNum === valArr.length) {
      return true;
    } else {
      return false;
    }
  }
  // 检查，是否有任意一个存在
  async testInOneExists(
    callName: string,
    key: string,
    valArr: any[],
  ): Promise<boolean> {
    return await this.connection.collection(callName).findOne({
      [key]: { $in: valArr },
    });
  }
}
