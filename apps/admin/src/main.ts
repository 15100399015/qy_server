import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('轻娱影视后台管理界面api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  app.listen(process.env.ADMIN_PORT);
  console.log(
    `http://${process.env.DATABASE}:${process.env.ADMIN_PORT}/api-docs`,
  );
}
bootstrap();
