import { CRUDRepository } from '@core';
import { IdeaEntity } from './idea.entity';
import { Idea } from '@shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IdeaRepository
  implements CRUDRepository<IdeaEntity, string, Idea>
{
  constructor(private readonly prisma: PrismaService) {}
  findById(id: string): Promise<Idea> {
    throw new Error('Method not implemented.');
  }
  create(item: IdeaEntity): Promise<Idea> {
    throw new Error('Method not implemented.');
  }
  update(id: string, item: IdeaEntity): Promise<Idea> {
    throw new Error('Method not implemented.');
  }
  destroy(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
