import { Module } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { IdeaRepository } from './idea.repository';

@Module({
  providers: [IdeaService, IdeaRepository],
  controllers: [IdeaController],
})
export class IdeaModule {}
