import { ForbiddenException, NotFoundException, InternalServerErrorException } from "@nestjs/common";
export function _403(message: string) {
  throw new ForbiddenException(message);
}
export function _404(message: string) {
  throw new NotFoundException(message);
}
export function _500(message: string) {
  throw new InternalServerErrorException(message);
}
export function insideErr() {
  _500("服务器内部错误");
}
