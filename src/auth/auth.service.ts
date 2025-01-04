import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RefreshTokenPayload, TokenPayload, User } from '@shared-types';
import { jwtOptions } from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtOptions.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtOptions>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async register(dto: CreateUserDto) {
    const user = await this.userService.create(dto);

    if (user) {
      return await this.loginUser(user, dto.modelName);
    }
  }

  public async loginUser(
    user: Pick<User, 'id' | 'role' | 'department'>,
    modelName: string,
    refreshTokenId?: string,
  ) {
    const payload: TokenPayload = {
      sub: user.id,
      role: user.role,
      department: user.department,
    };

    const refreshTokenPayload: RefreshTokenPayload = {
      ...payload,
      modelName,
      tokenId: randomUUID(),
      createdAt: new Date(),
    };

    try {
      await this.refreshTokenService.deleteRefreshSession(user.id);
      await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

      return {
        userId: user.id,
        access_token: await this.jwtService.signAsync(payload),
        refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
          secret: this.jwtConfig.refreshTokenSecret,
        }),
      };
    } catch {
      throw new NotFoundException();
    }
  }
}
