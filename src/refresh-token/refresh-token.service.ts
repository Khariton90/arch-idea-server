import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

    try {
      return await this.refreshTokenRepository.create(refreshToken);
    } catch {
      throw new UnauthorizedException();
    }
  }

  public async existToken(tokenId: string) {
    try {
      return await this.refreshTokenRepository.findById(tokenId);
    } catch {
      throw new UnauthorizedException();
    }
  }

  public async deleteRefreshSession(userId: string) {
    try {
      await this.refreshTokenRepository.destroy(userId);
    } catch {
      throw new BadRequestException();
    }
  }
}
