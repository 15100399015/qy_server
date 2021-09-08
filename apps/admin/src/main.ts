import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";

(async function () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 处理跨域
  app.enableCors();
  // 静态目录
  app.useStaticAssets("upload", { prefix: "/uploads" });
  app.listen(process.env.ADMIN_PORT);
  console.log("端口:" + process.env.ADMIN_PORT);
})();
