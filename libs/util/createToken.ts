import { encrypt } from "./crypto";
export interface TokenOption {
  // 有效时常
  eff?: number;
  sub: string;
  [key: string]: any;
}
export const createToken = (obj: TokenOption) => {
  // 合并配置
  let tokenObj = Object.assign({ eff: 0 }, obj);
  // 设置签发时间  秒
  tokenObj.iat = Math.floor(Date.now() / 1000);
  // 设置到期时间
  if (tokenObj.eff !== 0) {
    tokenObj.exp = tokenObj.iat + tokenObj.eff;
  } else {
    tokenObj.exp = 0;
  }
  Reflect.deleteProperty(tokenObj, "eff");
  return encrypt("json", tokenObj);
};
