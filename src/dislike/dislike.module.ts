import { Module } from '@nestjs/common';
import { DislikeService } from './dislike.service';
import { DislikeController } from './dislike.controller';
import { DislikeRepository } from './dislike.repository';
import { LikeRepository } from 'src/like/like.repository';

@Module({
  controllers: [DislikeController],
  providers: [DislikeService, DislikeRepository, LikeRepository],
  exports: [DislikeRepository],
})
export class DislikeModule {}
