import { CRUDRepository } from '@core';
import { IdeaEntity } from './idea.entity';
import { Idea } from '@shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IdeaQuery } from './query/idea.query';

@Injectable()
export class IdeaRepository
  implements CRUDRepository<IdeaEntity, string, Idea>
{
  constructor(private readonly prisma: PrismaService) {}

  public async findMany({
    limit,
    sortDirection,
    page,
  }: IdeaQuery): Promise<Idea[] | []> {
    return this.prisma.idea.findMany({
      take: limit,
      orderBy: [{ createdAt: sortDirection }],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async findById(id: string): Promise<Idea> {
    throw new Error('Method not implemented.');
  }

  public async create(item: IdeaEntity): Promise<Idea> {
    const data = item.toObject();
    return this.prisma.idea.create({
      data: { ...data },
    });
  }

  public async update(id: string, item: IdeaEntity): Promise<Idea> {
    throw new Error('Method not implemented.');
  }

  public async destroy(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
