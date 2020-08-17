import { Injectable } from '@nestjs/common';
import {
  writeFile,
  existsSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
} from 'fs';
import { join } from 'path';
import { get, set } from 'lodash';

function S(dir: string, fileName: string): Promise<any> {
  return new Promise((resolv, reject) => {
    const flieDir = join(__dirname, dir);
    const fliePath = join(__dirname, dir, fileName);
    // 目录是否存在
    const dirExist = existsSync(flieDir);
    // 文件是否存在
    const fileExist = existsSync(fliePath);
    // 文件存在直接，成功
    if (fileExist) return resolv();
    // 目录不存在创建目录
    if (!dirExist) {
      mkdirSync(flieDir);
    }
    // 写入文件
    writeFileSync(fliePath, JSON.stringify({}));
    // 尝试读取文件
    if (readFileSync(fliePath)) {
      resolv();
    }
  });
}

@Injectable()
export class ExtraService {
  private readonly SETTINGFILEPATH = './';
  private readonly SETTINGFILENAME = 'setting.json';
  private readonly SETTINGFILEPOSITION = join(
    __dirname,
    this.SETTINGFILEPATH,
    this.SETTINGFILENAME,
  );
  // 获取配置文件内容
  async get(path?: string) {
    await S(this.SETTINGFILEPATH, this.SETTINGFILENAME);
    const fileData = JSON.parse(
      readFileSync(this.SETTINGFILEPOSITION).toString(),
    );
    if (path) {
      return get(fileData, path, undefined);
    }
    return fileData;
  }
  // 设置文件内容
  async set(path: string, value: any) {
    await S(this.SETTINGFILEPATH, this.SETTINGFILENAME);
    let newSettingStr = JSON.stringify(
      set(
        JSON.parse(readFileSync(this.SETTINGFILEPOSITION).toString()),
        path,
        value,
      ),
    );
    let newSetting = await new Promise((resolve, reject) => {
      writeFile(this.SETTINGFILEPOSITION, newSettingStr, (err) => {
        if (err) return reject(err);
        return resolve(
          JSON.parse(readFileSync(this.SETTINGFILEPOSITION).toString()),
        );
      });
    });
    return newSetting;
  }
}
