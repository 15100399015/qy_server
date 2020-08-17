import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RootModel } from './modules/model/model.module';
import { ExtraModule } from './modules/extra/extra.module';
// plugin
import uniqueValidator = require('mongoose-unique-validator');

@Module({
  imports: [
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
        connectionFactory: (connection) => {
          connection.plugin(uniqueValidator, {
            message: '{PATH}不可重复',
          });
          return connection;
        },
      }),
    }),
  ],
  exports: [RootModel, ExtraModule],
})
export class DbModule {}
