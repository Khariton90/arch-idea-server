import { Inject, Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from './refresh-token.repository';
import { jwtOptions } from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenPayload } from '@shared-types';
import { RefreshTokenEntity } from './refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(jwtOptions.KEY)
    private readonly jwtConfig: ConfigType<typeof jwtOptions>,
  ) {}

  public async createRefreshSession(payload: RefreshTokenPayload) {
    const refreshToken = new RefreshTokenEntity({
      ...payload,
      tokenId: payload.tokenId,
      modelName: payload.modelName,
      createdAt: new Date(),
    });

    return await this.refreshTokenRepository.create(refreshToken);
  }

  public async existToken(tokenId: string) {
    const refreshToken = await this.refreshTokenRepository.findById(tokenId);
    return refreshToken;
  }

  public async deleteRefreshSession(tokenId: string) {
    await this.refreshTokenRepository.destroy(tokenId);
  }
}
