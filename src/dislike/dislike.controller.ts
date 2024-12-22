import {
  Controller,
  Post,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { DislikeService } from './dislike.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserRequest } from '@shared-types';
import { fillObject } from '@core';
import { DislikeRdo } from './rdo/dislike.rdo';

@ApiTags('Dislike')
@Controller('dislike')
export class DislikeController {
  constructor(private readonly dislikeService: DislikeService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async create(@Param('id') ideaId: string, @Req() { user }: UserRequest) {
    return fillObject(
      DislikeRdo,
      this.dislikeService.create({ ideaId, userId: user.sub }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') ideaId: string, @Req() { user }: UserRequest) {
    return fillObject(
      DislikeRdo,
      this.dislikeService.remove({ ideaId, userId: user.sub }),
    );
  }
}
