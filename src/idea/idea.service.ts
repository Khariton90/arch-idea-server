import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IdeaRepository } from './idea.repository';
import { IdeaDto } from './dto/idea.dto';
import { IdeaEntity } from './idea.entity';
import { IdeaQuery } from './query/idea.query';
import {
  BAD_REQUEST_IDEA_MESSAGE,
  NOT_FOUND_IDEA_MESSAGE,
} from './idea.constant';

@Injectable()
export class IdeaService {
  constructor(private readonly ideaRepository: IdeaRepository) {}

  public async findCount(query: IdeaQuery) {
    try {
      return await this.ideaRepository.findCount(query);
    } catch {
      return 0;
    }
  }

  public async create(dto: IdeaDto, userId: string) {
    const entity = new IdeaEntity({ ...dto, userId });
    try {
      return this.ideaRepository.create(entity);
    } catch {
      throw new BadRequestException(BAD_REQUEST_IDEA_MESSAGE);
    }
  }

  public async findMany(query: IdeaQuery, userId: string) {
    try {
      return await this.ideaRepository.findMany(query, userId);
    } catch {
      throw new BadRequestException(BAD_REQUEST_IDEA_MESSAGE);
    }
  }

  public async findUserIdeas(query: IdeaQuery, userId: string) {
    try {
      return await this.ideaRepository.findUserIdeas(query, userId);
    } catch {
      throw new BadRequestException(BAD_REQUEST_IDEA_MESSAGE);
    }
  }

  public async findFavoriteIdeas(query: IdeaQuery, userId: string) {
    try {
      return await this.ideaRepository.findFavoriteIdeas(query, userId);
    } catch {
      throw new BadRequestException(BAD_REQUEST_IDEA_MESSAGE);
    }
  }

  public async findOne(ideaId: string, userId: string) {
    try {
      return await this.ideaRepository.findById(ideaId, userId);
    } catch {
      throw new NotFoundException(NOT_FOUND_IDEA_MESSAGE);
    }
  }
}
