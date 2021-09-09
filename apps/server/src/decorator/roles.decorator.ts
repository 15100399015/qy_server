import { SetMetadata } from "@nestjs/common";

export const Roles = (...roles: Array<string>) => {
  if (roles.length === 0) return () => {};
  return SetMetadata("roles", roles);
};
