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
import { CreateIdeaSolutionDto } from './dto/create-idea-solution.dto';
import { UserService } from 'src/user/user.service';
import { UpdateIdeaDto } from './dto/update-idea.dto';

@Injectable()
export class IdeaService {
  constructor(
    private readonly ideaRepository: IdeaRepository,
    private readonly userService: UserService,
  ) {}

  public async findCount(query: IdeaQuery) {
    try {
      return await this.ideaRepository.findCount(query);
    } catch {
      return 0;
    }
  }

  public async create(dto: IdeaDto, userId: string) {
    const entity = new IdeaEntity({ ...dto, userId, solution: '' });
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

  public async createSolution(
    ideaId: string,
    userId: string,
    dto: CreateIdeaSolutionDto,
  ) {
    try {
      const idea = await this.ideaRepository.findById(ideaId, userId);

      if (!idea) {
        throw new NotFoundException();
      }

      const entity = new IdeaEntity({
        ...idea,
        solution: dto.solution,
        status: dto.status,
      });

      const updatedIdea = await this.ideaRepository.update(ideaId, entity);

      if (updatedIdea.status === 'Completed') {
        const completedCount =
          await this.ideaRepository.findCompletedIdeasCount(userId);
        await this.userService.updateUserStatus(userId, completedCount);
      }

      return updatedIdea;
    } catch {
      throw new BadRequestException();
    }
  }

  public async updateIdea(id: string, userId: string, dto: UpdateIdeaDto) {
    try {
      const existIdea = await this.ideaRepository.findOne(id);

      if (
        existIdea &&
        userId === existIdea.userId &&
        existIdea.status === 'New'
      ) {
        const updatedEntity = new IdeaEntity({ ...existIdea, ...dto });
        return await this.ideaRepository.update(existIdea.id, updatedEntity);
      }

      throw new NotFoundException();
    } catch {
      throw new BadRequestException();
    }
  }
}
