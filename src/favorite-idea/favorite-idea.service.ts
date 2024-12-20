import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FavoriteIdeaRepository } from './favorite-idea.repository';
import { CreateFavoriteIdeaDto } from './dto/create-favorite-idea.dto';
import { FavoriteIdeaEntity } from './favorite-idea.entity';

const ERROR_MESSAGE_WHEN_CREATED = 'Error when creating a record';
const ERROR_MESSAGE_WHEN_DELETE = 'Error when delete a record';

@Injectable()
export class FavoriteIdeaService {
  constructor(
    private readonly favoriteIdeaRepository: FavoriteIdeaRepository,
  ) {}

  public async create(createFavoriteIdeaDto: CreateFavoriteIdeaDto) {
    const entity = new FavoriteIdeaEntity(createFavoriteIdeaDto);

    try {
      await this.favoriteIdeaRepository.create(entity);
    } catch {
      throw new InternalServerErrorException(ERROR_MESSAGE_WHEN_CREATED);
    }
  }

  public async remove(dto: CreateFavoriteIdeaDto) {
    try {
      await this.favoriteIdeaRepository.destroy(dto);
    } catch {
      throw new InternalServerErrorException(ERROR_MESSAGE_WHEN_DELETE);
    }
  }
}
