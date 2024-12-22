import { LikeEntity } from './like.entity';
import { LikeDislike } from '@shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikeRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: LikeEntity): Promise<LikeDislike> {
    const data = item.toObject();
    return await this.prisma.like.create({
      data: {
        ...data,
      },
    });
  }

  public async findById({
    userId,
    ideaId,
  }: LikeDto): Promise<LikeDislike | null> {
    return await this.prisma.like.findUnique({
      where: {
        userId_ideaId: {
          userId,
          ideaId,
        },
      },
    });
  }

  public async destroy({ userId, ideaId }: LikeDto): Promise<void> {
    await this.prisma.like.delete({
      where: {
        userId_ideaId: {
          userId,
          ideaId,
        },
      },
    });
  }
}