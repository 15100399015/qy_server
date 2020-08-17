import { Injectable } from '@nestjs/common';
import { writeFile, mkdir, existsSync, readFile } from 'fs';
import { join } from 'path';
import { get, set } from 'lodash';

function S(dir, fileName) {
  return new Promise((resolv, reject) => {
    const fliePath = join(__dirname, dir, fileName);
    if (existsSync(fliePath)) return resolv();
    mkdir(dir, (err) => {
      if (err) return reject();
      writeFile(fliePath, JSON.stringify({}), (err) => {
        if (err) return reject();
        readFile(fliePath, (err) => {
          if (err) return reject();
          return resolv();
        });
      });
    });
  });
}

@Injectable()
export class ExtraService {
  private readonly SETTINGFILEPATH = './';
  private readonly SETTINGFILENAME = 'setting.json';
  // 获取配置文件内容
  async get(path?: string) {
    await S(this.SETTINGFILEPATH, this.SETTINGFILENAME);
    if (path) {
      return get(
        require(this.SETTINGFILEPATH + this.SETTINGFILENAME),
        path,
        undefined,
      );
    }
    return require(this.SETTINGFILEPATH + this.SETTINGFILENAME);
  }
  // 设置文件内容
  async set(path: string, value: any) {
    await S(this.SETTINGFILEPATH, this.SETTINGFILENAME);
    let newSettingStr = JSON.stringify(
      set(require(this.SETTINGFILEPATH + this.SETTINGFILENAME), path, value),
    );
    let newSetting = await new Promise((resolve, reject) => {
      writeFile(
        this.SETTINGFILEPATH + this.SETTINGFILENAME,
        newSettingStr,
        (err) => {
          if (err) return reject(err);
          return resolve(require(this.SETTINGFILEPATH + this.SETTINGFILENAME));
        },
      );
    });
    return newSetting;
  }
}
