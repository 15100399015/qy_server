import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: Array<string>) => {
  // 如果没有传递参数
  if (roles.length === 0) return () => {};
  return SetMetadata('roles', roles);
};
