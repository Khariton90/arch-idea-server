import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { TokenPayload } from '@shared-types';
import { jwtOptions } from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtOptions.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtOptions>,
  ) {}

  public async register(dto: CreateUserDto) {
    const user = await this.userService.create(dto);

    const payload: TokenPayload = {
      sub: user.id,
      role: user.role,
      department: user.department,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: this.jwtConfig.refreshTokenSecret,
        expiresIn: this.jwtConfig.refreshTokenExpiresIn,
      }),
    };
  }
}
