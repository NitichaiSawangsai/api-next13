import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '../../user-management/services/user.service';
import { User } from '../../user-management/entities/user.entity';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,

    @Inject(forwardRef(() => UserService))
    private userService: UserService,

    @Inject(forwardRef(() => HttpService))
    private httpService: HttpService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const bearer = request.headers.authorization?.replace(/^bearer\s/i, '');

    let user: User = null;
    let errorDecode = null;
    try {
      try {
        user = await this.authService.decodeJwt(bearer);
      } catch (error) {
        errorDecode = error;
      }

      if (user?.email) {
        user = await this.userService.getUser(user, {});
      }
    } catch (error) {
      console.error('error +>> ', error);
    }

    if (errorDecode) {
      throw new UnauthorizedException();
    }

    if (!user?.id) {
      throw new NotFoundException('user not found', 'USER_NOT_FOUND');
    }

    request.user = {};
    request.user.user = user;

    return true;
  }
}
