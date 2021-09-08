import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { REULTCODES } from "@admin/constant";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => ({ code: REULTCODES.SUCCESS, data })));
  }
}
