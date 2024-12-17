import { Injectable } from '@nestjs/common';
import { IdeaRepository } from './idea.repository';
import { IdeaDto } from './dto/idea.dto';
import { IdeaEntity } from './idea.entity';

@Injectable()
export class IdeaService {
  constructor(private readonly ideaRepository: IdeaRepository) {}

  public async create(dto: IdeaDto, userId: string) {
    const entity = new IdeaEntity({ ...dto, userId: userId });
    return this.ideaRepository.create(entity);
  }
}
