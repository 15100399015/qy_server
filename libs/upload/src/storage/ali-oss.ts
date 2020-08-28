const cryptoRandomString = require("crypto-random-string");
const Client = require("ali-oss");
const { BadRequestException } = require("@nestjs/common");

// 文静名称/ 文件路径
function getDestination(req, file, cb) {
  const random = cryptoRandomString({ length: 32 });
  const format = file.originalname.substr(file.originalname.lastIndexOf("."));
  const name = random + format;
  cb(name);
}

class AliOssStorage {
  client;
  getDestination;
  constructor(opts) {
    // 阿里连接
    this.client = new Client(opts.config);
    // 获取文件地址
    this.getDestination = opts.destination || getDestination;
  }
  // 处理上传文件
  _handleFile(req, file, cb) {
    // 处理路径存储名称
    this.getDestination(req, file, (filename) => {
      this.client
        .putStream(filename, file.stream)
        .then((result) => {
          return cb(null, {
            filename: result.name,
            url: result.url,
          });
        })
        .catch((err) => {
          return cb(err);
        });
    });
  }
  // 移除文件
  _removeFile(req, file, cb) {
    this.client
      .delete(file.filename)
      .then((result) => {
        return cb(null, result);
      })
      .catch((err) => {
        return cb(err);
      });
  }
}

// 导出方法
export const aliossStorage = function (opts) {
  return new AliOssStorage(opts);
};

export const fileFilter = (req, file, cb) => {
  const on = file.originalname;
  const format = on.substr(on.lastIndexOf(".") + 1);
  const verify = /Webp|BMP|GIF|JPEG|JPG|PNG|SVG/gi.test(format);
  const err = verify ? null : new BadRequestException("只接受图片格式");
  cb(err, verify);
};
