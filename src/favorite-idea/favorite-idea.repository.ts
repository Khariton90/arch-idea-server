import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoriteIdeaEntity } from './favorite-idea.entity';
import { FavoriteIdea } from '@shared-types';
import { CreateFavoriteIdeaDto } from './dto/create-favorite-idea.dto';

@Injectable()
export class FavoriteIdeaRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: FavoriteIdeaEntity): Promise<FavoriteIdea> {
    const data = item.toObject();
    await this.prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        favoriteIdeasCount: {
          increment: 1,
        },
      },
    });

    return this.prisma.favoriteIdea.create({
      data: { ...data },
    });
  }

  public async destroy({
    userId,
    ideaId,
  }: CreateFavoriteIdeaDto): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favoriteIdeasCount: {
          decrement: 1,
        },
      },
    });

    await this.prisma.favoriteIdea.delete({
      where: {
        userId_ideaId: {
          userId,
          ideaId,
        },
      },
    });
  }
}
