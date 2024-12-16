import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IdeaDto } from './dto/idea.dto';
import { UserRequest } from '@shared-types';
import { IdeaService } from './idea.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@core';

@ApiTags('Idea')
@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: IdeaDto,
    description: 'A new idea has been created',
  })
  async create(@Body() dto: IdeaDto, @Req() { user }: UserRequest) {
    return fillObject(
      IdeaDto,
      this.ideaService.create({
        ...dto,
        userId: user.sub,
        department: user.department,
      }),
    );
  }
}
