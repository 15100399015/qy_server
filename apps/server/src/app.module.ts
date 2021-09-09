import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { CommonModule } from "@lib/common";

import { HttpExceptionsFilter } from "./exception/http-exception.filter";
import { ResponseInterceptor } from "./interceptor/response.interceptor";

import { SettingModule } from "./modules/setting/setting.module";

@Module({
  imports: [CommonModule, SettingModule],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
