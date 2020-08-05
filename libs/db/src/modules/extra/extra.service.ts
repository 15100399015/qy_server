import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs';
import { get, set } from 'lodash';
@Injectable()
export class ExtraService {
  // 获取配置文件内容
  get(path?: string) {
    if (path) return get(require('@libs/db/extraFile/setting.json'), path);
    return require('@libs/db/extraFile/setting.json');
  }
  // 设置文件内容
  async set(path: string, value: any) {
    let newSettingStr = JSON.stringify(
      set(require('@libs/db/extraFile/setting.json'), path, value),
    );
    let newSetting = await new Promise((res, rej) => {
      writeFile('@libs/db/extraFile/setting.json', newSettingStr, (err) => {
        if (err) return rej(err);
        return res(require('@libs/db/extraFile/setting.json'));
      });
    });

    return Promise.resolve(newSetting);
  }
}
