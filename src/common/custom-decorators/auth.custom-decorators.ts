import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IRequestAuth } from '../interface/auth.interface';

export const UserReq = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request: IRequestAuth = ctx.switchToHttp().getRequest();
    const user = request?.user?.user;
    return user;
  },
);
