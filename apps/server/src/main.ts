import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
(async function () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.listen(process.env.SERVER_PORT);
})();
