import { Module } from '@nestjs/common';
import { IdeaModule } from './idea/idea.module';

@Module({
  imports: [IdeaModule],
})
export class AppModule {}
