import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@libs/config';
import { RootModel } from './modules/model/model.module';
import { ExtraModule } from './modules/extra/extra.module';
@Module({
  imports: [
    ConfigModule,
    RootModel,
    ExtraModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb://${process.env.DATABASE}:${process.env.DATABASE_PORT}`,
        dbName: process.env.DATABASE_NAME,
        // user: process.env.DATABASE_USER,
        // pass: process.env.DATABASE_PASS,
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }),
    }),
  ],
  exports: [RootModel, ExtraModule, ConfigModule],
})
export class DbModule {}
