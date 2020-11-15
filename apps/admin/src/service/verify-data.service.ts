import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class VerifyService {
  private readonly models: { [key: string]: Model<any, {}> };
  constructor(@InjectConnection() private connection: Connection) {
    this.models = this.connection.models;
  }
  // 检查单个是否存在
  async testOneExist(callName: string, key: string, val: any) {
    return await this.models[callName].findOne({ [key]: val });
  }
  // 检查是否全部存在
  async testAllExist(callName: string, key: string, valArr: any[]) {
    const resNum = await this.models[callName].find({ [key]: { $in: valArr } }).countDocuments();
    return resNum === valArr.length;
  }
  // 检查，是否有任意一个存在
  async testInOneExists(callName: string, key: string, valArr: any[]) {
    return await this.models[callName].findOne({ [key]: { $in: valArr } });
  }
}
