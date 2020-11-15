import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { _403 } from "@util/concise-exception";

export class ICrudQuery {
  where?: any;
  limit?: number;
  page?: number;
  sort?: string | any;
  populate?: string | any;
  select?: string | any;
}

export const CrudQuery = createParamDecorator((name = "query", ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  if (!req.query[name]) return {};
  try {
    // @ts-ignore
    return JSON.parse(req.query[name]);
  } catch (e) {
    _403("query switch failed");
  }
});
