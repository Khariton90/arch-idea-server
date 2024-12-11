import { CRUDRepository } from '@core';
import { IdeaEntity } from './idea.entity';
import { Idea } from '@shared-types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IdeaRepository
  implements CRUDRepository<IdeaEntity, string, Idea>
{
  public async findById(id: string): Promise<Idea> {
    throw new Error('Method not implemented.');
  }

  public async create(item: IdeaEntity): Promise<Idea> {
    throw new Error('Method not implemented.');
  }

  public async update(id: string, item: IdeaEntity): Promise<Idea> {
    throw new Error('Method not implemented.');
  }

  public async destroy(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
