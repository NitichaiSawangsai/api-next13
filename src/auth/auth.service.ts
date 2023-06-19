import { Injectable } from '@nestjs/common';
import { UserService } from '../user-management/services/user.service';
import { LoginDto } from './dtos/auth.dto';
import { IAccessToken, IAuthPayload } from '../common/interface/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user-management/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    private readonly userService: UserService,
  ) {}

  decodeJwt(token: string): User {
    return this.jwtService.verify(token);
  }

  async signUserToken(payload: IAuthPayload): Promise<IAccessToken> {
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userService.getUser(
      { email: dto?.email }, //! password: dto?.password
      {},
    );

    return this.signUserToken({
      id: user.id,
      email: user.email,
      roleId: user.roleId,
    });
  }
}
