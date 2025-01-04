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

  public async findById(id: string): Promise<RefreshTokenPayload | null> {
    return await this.prisma.refreshToken.findFirst({
      where: { tokenId: id },
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

  public async destroy(id: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({ where: { sub: id } });
  }
}
