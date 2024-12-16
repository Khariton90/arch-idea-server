import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { IdeaDto } from './dto/idea.dto';
import { UserRequest } from '@shared-types';
import { IdeaService } from './idea.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('idea')
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() dto: IdeaDto, @Req() { user }: UserRequest) {
    return this.ideaService.create({
      ...dto,
      userId: user.sub,
      department: user.department,
    });
  }
}
