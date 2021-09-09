import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserInfo = createParamDecorator((key: string, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();
  if (key) return user[key];
  return user;
});
