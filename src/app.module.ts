import { Module } from '@nestjs/common';
import { IdeaModule } from './idea/idea.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constants';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { jwtOptions } from './config/jwt.config';
import envSchema from './env.schema';
import { AppService } from './app.service';
import { FavoriteIdeaModule } from './favorite-idea/favorite-idea.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { DislikeModule } from './dislike/dislike.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { AppController } from './app.contoller';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtOptions],
      validationSchema: envSchema,
    }),
    IdeaModule,
    PrismaModule,
    UserModule,
    AuthModule,
    DepartmentModule,
    FavoriteIdeaModule,
    CommentModule,
    LikeModule,
    DislikeModule,
    RefreshTokenModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
