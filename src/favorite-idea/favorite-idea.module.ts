import { Module } from '@nestjs/common';
import { FavoriteIdeaService } from './favorite-idea.service';
import { FavoriteIdeaController } from './favorite-idea.controller';
import { FavoriteIdeaRepository } from './favorite-idea.repository';

@Module({
  controllers: [FavoriteIdeaController],
  providers: [FavoriteIdeaService, FavoriteIdeaRepository],
})
export class FavoriteIdeaModule {}
