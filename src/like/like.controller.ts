import {
  Controller,
  Post,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { UserRequest } from '@shared-types';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { fillObject } from '@core';
import { LikeRdo } from './rdo/like.rdo';

@ApiTags('Like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async create(@Param('id') ideaId: string, @Req() { user }: UserRequest) {
    return fillObject(
      LikeRdo,
      this.likeService.create({ ideaId, userId: user.sub }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') ideaId: string, @Req() { user }: UserRequest) {
    return fillObject(
      LikeRdo,
      this.likeService.remove({ ideaId, userId: user.sub }),
    );
  }
}
