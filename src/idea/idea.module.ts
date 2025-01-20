import { Module } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { IdeaRepository } from './idea.repository';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [IdeaService, IdeaRepository, UserService],
  controllers: [IdeaController],
})
export class IdeaModule {}
