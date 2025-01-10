import { CRUDRepository } from '@core';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenPayload } from '@shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RefreshTokenRepository
  implements CRUDRepository<RefreshTokenEntity, string, RefreshTokenPayload>
{
  constructor(private readonly prisma: PrismaService) {}

  public async findById(tokenId: string): Promise<RefreshTokenPayload | null> {
    return await this.prisma.refreshToken.findUnique({
      where: { tokenId },
    });
  }

  public async create(item: RefreshTokenEntity): Promise<RefreshTokenPayload> {
    const data = item.toObject();

    return await this.prisma.refreshToken.create({
      data: { ...data },
    });
  }

  public async update(
    id: string,
    item: RefreshTokenEntity,
  ): Promise<RefreshTokenPayload> {
    const data = item.toObject();

    return await this.prisma.refreshToken.update({
      where: { id: data.tokenId },
      data: data,
    });
  }

  public async destroy(userId: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({ where: { sub: userId } });
  }
}
