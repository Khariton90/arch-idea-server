import { Module } from '@nestjs/common';
import { IdeaModule } from './idea/idea.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [IdeaModule, PrismaModule],
})
export class AppModule {}
