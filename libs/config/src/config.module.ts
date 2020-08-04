import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    _ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(27017),
        DATABASE_NAME: Joi.string().default('qy_cms'),
        DATABASE_USER: Joi.string().default(''),
        DATABASE_PASS: Joi.string().default(''),
        ADMIN_PORT: Joi.number().default(3001),
        SERVER_PORT: Joi.number().default(8080),
      }),
    }),
  ],
})
export class ConfigModule {}
