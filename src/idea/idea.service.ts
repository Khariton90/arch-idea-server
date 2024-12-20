import { Injectable } from '@nestjs/common';
import { IdeaRepository } from './idea.repository';
import { IdeaDto } from './dto/idea.dto';
import { IdeaEntity } from './idea.entity';
import { IdeaQuery } from './query/idea.query';

@Injectable()
export class IdeaService {
  constructor(private readonly ideaRepository: IdeaRepository) {}

  public async create(dto: IdeaDto, userId: string) {
    const entity = new IdeaEntity({ ...dto, userId });
    return this.ideaRepository.create(entity);
  }

  public async findMany(query: IdeaQuery, userId: string) {
    return this.ideaRepository.findMany(query, userId);
  }
}
