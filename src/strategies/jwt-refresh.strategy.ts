import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtOptions } from 'src/config/jwt.config';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenPayload } from '@shared-types';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(jwtOptions.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtOptions>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  public async validate(_req: Request, payload: RefreshTokenPayload) {
    const existToken = await this.refreshTokenService.existToken(
      payload.tokenId,
    );

    if (!existToken) {
      throw new UnauthorizedException('Bad refresh token');
    }

    return payload;
  }
}
