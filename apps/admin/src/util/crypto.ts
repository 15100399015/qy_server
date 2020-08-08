import { enc, AES, mode, pad } from 'crypto-js';
// 加密
export const encrypt = (
  _mode: 'text' | 'json',
  word: { [key: string]: any } | string,
): string => {
  // 如果是对象 转换为string
  if (_mode === 'json') {
    word = JSON.stringify(word);
  }
  var key = enc.Utf8.parse('46cc793c53dc451b');
  var srcs = enc.Utf8.parse(word as string);
  var encrypted = AES.encrypt(srcs, key, {
    mode: mode.ECB,
    padding: pad.Pkcs7,
  });
  return encrypted.toString();
};

export const decrypt = (word: string): string => {
  var key = enc.Utf8.parse('46cc793c53dc451b');
  var decrypt = AES.decrypt(word, key, {
    mode: mode.ECB,
    padding: pad.Pkcs7,
  });
  return enc.Utf8.stringify(decrypt).toString();
};
