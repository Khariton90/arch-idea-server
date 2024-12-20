import {
  Controller,
  Post,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { FavoriteIdeaService } from './favorite-idea.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserRequest } from '@shared-types';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteIdeaController {
  constructor(private readonly favoriteIdeaService: FavoriteIdeaService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Idea added to favorites',
  })
  create(@Param('id') ideaId: string, @Req() { user }: UserRequest) {
    console.log({ userId: user.sub, ideaId });
    return this.favoriteIdeaService.create({ userId: user.sub, ideaId });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The idea was removed from favorites',
  })
  remove(@Param('id') ideaId: string, @Req() { user }: UserRequest) {
    return this.favoriteIdeaService.remove({ ideaId, userId: user.sub });
  }
}
