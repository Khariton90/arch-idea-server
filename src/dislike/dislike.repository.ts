import { LikeDislike } from '@shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DislikeEntity } from './dislike.entity';
import { DislikeDto } from './dto/dislike.dto';

@Injectable()
export class DislikeRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: DislikeEntity): Promise<LikeDislike> {
    const data = item.toObject();
    return await this.prisma.dislike.create({
      data: {
        ...data,
      },
    });
  }

  public async findById({
    userId,
    ideaId,
  }: DislikeDto): Promise<LikeDislike | null> {
    return await this.prisma.dislike.findUnique({
      where: {
        userId_ideaId: {
          userId,
          ideaId,
        },
      },
    });
  }

  public async destroy({ userId, ideaId }: DislikeDto) {
    await this.prisma.dislike.delete({
      where: {
        userId_ideaId: {
          userId,
          ideaId,
        },
      },
    });

    return { ideaId, userId };
  }
}
