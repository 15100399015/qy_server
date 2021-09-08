import { encrypt } from "./crypto";
export interface TokenOption {
  eff?: number;
  sub: string;
  [key: string]: any;
}
export const generateToken = (obj: TokenOption) => {
  let tokenObj = Object.assign({ eff: 0 }, obj);
  tokenObj.iat = Math.floor(Date.now() / 1000);
  if (tokenObj.eff !== 0) tokenObj.exp = tokenObj.iat + tokenObj.eff;
  else tokenObj.exp = 0;
  Reflect.deleteProperty(tokenObj, "eff");
  return encrypt("json", tokenObj);
};
