import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs';
import { join } from 'path';
import { get, set } from 'lodash';
const SETTING_FLIE_PATH = join(__dirname, '../../../extraFile/setting.json');
@Injectable()
export class ExtraService {
  // 获取配置文件内容
  get(path?: string) {
    if (path) return get(require(SETTING_FLIE_PATH), path);
    return require(SETTING_FLIE_PATH);
  }
  // 设置文件内容
  async set(path: string, value: any) {
    let newSettingStr = JSON.stringify(
      set(require(SETTING_FLIE_PATH), path, value),
    );
    let newSetting = await new Promise((res, rej) => {
      writeFile(SETTING_FLIE_PATH, newSettingStr, err => {
        if (err) return rej(err);
        return res(require(SETTING_FLIE_PATH));
      });
    });

    return Promise.resolve(newSetting);
  }
}
