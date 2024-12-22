import { Injectable, NotFoundException } from '@nestjs/common';
import { IdeaRepository } from './idea.repository';
import { IdeaDto } from './dto/idea.dto';
import { IdeaEntity } from './idea.entity';
import { IdeaQuery } from './query/idea.query';

const NOT_FOUND_IDEA_MESSAGE = 'The idea of a fake ID was not found';

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

  public async findOne(ideaId: string, userId: string) {
    try {
      return await this.ideaRepository.findById(ideaId, userId);
    } catch {
      throw new NotFoundException(NOT_FOUND_IDEA_MESSAGE);
    }
  }
}
