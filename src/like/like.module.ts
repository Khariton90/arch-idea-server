import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';
import { DislikeRepository } from 'src/dislike/dislike.repository';

@Module({
  controllers: [LikeController],
  providers: [LikeService, LikeRepository, DislikeRepository],
  exports: [LikeRepository],
})
export class LikeModule {}
