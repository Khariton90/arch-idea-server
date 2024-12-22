import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';

@Module({
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
})
export class LikeModule {}
