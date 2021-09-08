import { enc, AES, mode, pad } from "crypto-js";
export const encrypt = (_mode: "text" | "json", word: { [key: string]: any } | string): string => {
  if (_mode === "json") word = JSON.stringify(word);
  let key = enc.Utf8.parse("46cc793c53dc451b");
  let srcs = enc.Utf8.parse(word as string);
  let encrypted = AES.encrypt(srcs, key, { mode: mode.ECB, padding: pad.Pkcs7 });
  return encrypted.toString();
};
export const decrypt = (word: string): string => {
  let key = enc.Utf8.parse("46cc793c53dc451b");
  let decrypt = AES.decrypt(word, key, { mode: mode.ECB, padding: pad.Pkcs7 });
  return enc.Utf8.stringify(decrypt).toString();
};
