import { ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtOptions = registerAs('jwt', () => ({
  accessTokenSecret: process.env.JWT_AT_SECRET,
  accessTokenExpiresIn: process.env.JWT_AT_EXPIRES_IN,
  refreshTokenSecret: process.env.JWT_RT_SECRET,
}));

export async function getJwtConfig(
  configService: ConfigService,
): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.accessTokenSecret'),
    signOptions: {
      expiresIn: configService.get<string>('jwt.accessTokenExpiresIn'),
      algorithm: 'HS256',
    },
  };
}
