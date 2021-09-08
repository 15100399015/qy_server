import { ForbiddenException, NotFoundException, InternalServerErrorException, HttpException } from "@nestjs/common";
export function _403(message: string) {
  throw new ForbiddenException(message);
}
export function _404(message: string) {
  throw new NotFoundException(message);
}
export function _500(message: string) {
  throw new InternalServerErrorException(message);
}
export function _tcrs(code: number, message: string) {
  return new HttpException({ code, message }, 103);
}
