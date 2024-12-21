import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentQuery } from './query/comment.query';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@core';
import { CommentRdo, CommentsResponseDto } from './rdo/comment.rdo';
import { UserRequest } from '@shared-types';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:ideaId')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CommentRdo,
    description: 'Created a new comment',
  })
  async create(
    @Param('ideaId') ideaId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() { user }: UserRequest,
  ) {
    return fillObject(
      CommentRdo,
      this.commentService.create(createCommentDto, user.sub, ideaId),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:ideaId')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [CommentsResponseDto],
    description: 'Array with Comments was received',
  })
  async findAll(@Param('ideaId') ideaId: string, @Query() query: CommentQuery) {
    return fillObject(
      CommentsResponseDto,
      this.commentService.findAll(query, ideaId),
    );
  }
}
