import { BadRequestException, Injectable } from '@nestjs/common';
import { LikeEntity } from 'src/like/like.entity';
import { LikeDto } from 'src/like/dto/like.dto';
import { DislikeRepository } from './dislike.repository';
import { LikeRepository } from 'src/like/like.repository';

@Injectable()
export class DislikeService {
  constructor(
    private readonly dislikeRepository: DislikeRepository,
    private readonly likeRepository: LikeRepository,
  ) {}

  async create(dto: LikeDto) {
    try {
      const existLike = await this.dislikeRepository.findById(dto);

      if (existLike) {
        return this.remove(dto);
      }

      const existDislike = await this.likeRepository.findById(dto);

      if (existDislike) {
        await this.likeRepository.destroy(dto);
      }

      const entity = new LikeEntity(dto);
      return await this.dislikeRepository.create(entity);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(dto: LikeDto) {
    try {
      return await this.dislikeRepository.destroy(dto);
    } catch {
      throw new BadRequestException();
    }
  }
}
