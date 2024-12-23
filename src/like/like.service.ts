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
      const existLike = await this.likeRepository.findById(dto);

      if (existLike) {
        return this.remove(dto);
      }

      const existDislike = await this.dislikeRepository.findById(dto);

      if (existDislike) {
        await this.dislikeRepository.destroy(dto);
      }

      const entity = new LikeEntity(dto);
      return await this.likeRepository.create(entity);
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
