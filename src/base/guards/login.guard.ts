import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Injectable()
export class LoginGuard extends AuthGuard('local') implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = <boolean> await super.canActivate(context);
    const request = context.switchToHttp().getRequest<Request>();
    await super.logIn(request);

    return result;
  }
}
