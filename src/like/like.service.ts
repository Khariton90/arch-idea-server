import { BadRequestException, Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { LikeEntity } from './like.entity';
import { LikeDto } from './dto/like.dto';
import { DislikeRepository } from 'src/dislike/dislike.repository';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly dislikeRepository: DislikeRepository,
  ) {}

  async create(dto: LikeDto) {
    try {
      const existDislike = await this.dislikeRepository.findById(dto);

      if (existDislike) {
        await this.dislikeRepository.destroy(dto);
      }

      const existLike = await this.likeRepository.findById(dto);

      if (existLike) {
        const deletedLike = await this.likeRepository.destroy(dto);

        return { ...deletedLike, reactionType: 'None' };
      }

      const entity = new LikeEntity(dto);
      const createdLike = await this.likeRepository.create(entity);

      return { ...createdLike, reactionType: 'Like' };
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(dto: LikeDto) {
    try {
      return await this.likeRepository.destroy(dto);
    } catch {
      throw new BadRequestException();
    }
  }
}
