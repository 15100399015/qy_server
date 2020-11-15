import { Injectable } from "@nestjs/common";
import { writeFileSync, readFileSync } from "fs";
import { join } from "path";
import { get, set } from "lodash";

// 相对于当前代码执行目录
const SETTINGFILEPATH = "./";
// 文件名称
const SETTINGFILENAME = "setting.json";
// 组合路径
function joinSettingFilePath() {
  return join(__dirname, SETTINGFILEPATH, SETTINGFILENAME);
}
// 读取
let settingObj = null;

try {
  settingObj = JSON.parse(readFileSync(joinSettingFilePath(), "utf8"));
} catch (error) {
  settingObj = {};
}

@Injectable()
export class ExtraService {
  setting = settingObj;
  // 获取配置文件内容
  get = (path) => get(this.setting, path);
  // 设置文件内容
  async set(path: string, value: any) {
    set(this.setting, path, value);
    writeFileSync(joinSettingFilePath(), JSON.stringify(this.setting));
    return get(this.setting, path);
  }
}
