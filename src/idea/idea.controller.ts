import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IdeaDto } from './dto/idea.dto';
import { UserRequest } from '@shared-types';
import { IdeaService } from './idea.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@core';
import { IdeaRdo } from './rdo/idea.rdo';
import { IdeaQuery } from './query/idea.query';

@ApiTags('Idea')
@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Get('totalCount')
  public async findCount(@Query() query: IdeaQuery) {
    return await this.ideaService.findCount(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [IdeaRdo],
    description: 'Array with Ideas was received',
  })
  async findMany(@Query() query: IdeaQuery, @Req() { user }: UserRequest) {
    const ideas = await this.ideaService.findMany(query, user.sub);
    return fillObject(IdeaRdo, ideas);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-ideas')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [IdeaRdo],
    description: 'Array with User Ideas was received',
  })
  async findUserIdeas(@Query() query: IdeaQuery, @Req() { user }: UserRequest) {
    return fillObject(IdeaRdo, this.ideaService.findUserIdeas(query, user.sub));
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorite-ideas')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [IdeaRdo],
    description: 'Array with Favorite Ideas was received',
  })
  async findFavoriteIdeas(
    @Query() query: IdeaQuery,
    @Req() { user }: UserRequest,
  ) {
    return fillObject(
      IdeaRdo,
      this.ideaService.findFavoriteIdeas(query, user.sub),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: IdeaRdo,
    description: 'A new idea has been created',
  })
  async create(@Body() dto: IdeaDto, @Req() { user }: UserRequest) {
    return fillObject(IdeaRdo, this.ideaService.create(dto, user.sub));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Got an idea by ID',
  })
  async findById(@Param('id') ideaId: string, @Req() { user }: UserRequest) {
    return fillObject(IdeaRdo, this.ideaService.findOne(ideaId, user.sub));
  }
}
