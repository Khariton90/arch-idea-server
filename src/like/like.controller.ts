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

@ApiTags('Like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  create(@Param('id') ideaId: string, @Req() { user }: UserRequest) {
    return this.likeService.create({ ideaId, userId: user.sub });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') ideaId: string, @Req() { user }: UserRequest) {
    return this.likeService.remove({ ideaId, userId: user.sub });
  }
}
