import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();
    if (status === 103) response.status(200);
    else response.status(status);
    return response.json(errorResponse);
  }
}
