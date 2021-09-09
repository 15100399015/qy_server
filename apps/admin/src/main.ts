import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
(async function () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 处理跨域
  app.enableCors();
  // 静态目录
  app.useStaticAssets("upload", { prefix: "/uploads" });
  app.use(cookieParser());
  app.listen(process.env.ADMIN_PORT);
})();
