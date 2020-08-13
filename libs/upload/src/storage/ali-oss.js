import fs from 'fs';
import OSS from 'ali-oss';

function getDestination(req, file, cb) {
  cb(null, '/dev/null');
}

class MyCustomStorage {
  client;
  getDestination;
  constructor(opts) {
    // 阿里连接
    this.client = new OSS(opts.config);
    this.getDestination = opts.destination || getDestination;
  }
  _handleFile(req, file, cb) {
    // // 连接错误
    // if (!this.client) {
    //   console.error('oss client undefined');
    //   return cb({ message: 'oss client undefined' });
    // }

    this.getDestination(req, file, function (err, path) {
      if (err) return cb(err);

      var outStream = fs.createWriteStream(path);

      file.stream.pipe(outStream);
      outStream.on('error', cb);
      outStream.on('finish', function () {
        cb(null, {
          path: path,
          size: outStream.bytesWritten,
        });
      });
    });
  }
  _removeFile(req, file, cb) {
    // console.log(req);
    console.log(file);
    fs.unlink(file.path, cb);
  }
}

// 导出方法
export const aliossStorage = function (opts) {
  return new MyCustomStorage(opts);
};
