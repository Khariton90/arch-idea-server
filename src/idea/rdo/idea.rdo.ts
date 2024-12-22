import { IdeaStatus } from '@shared-types/idea-status.type';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsString } from 'class-validator';
import { ReactionType } from '@shared-types';

export class IdeaRdo {
  @ApiProperty({
    description: 'Unique idea ID',
    example: 'eyJzdWIiOiIxMjM',
  })
  @Expose()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The main title is the idea.',
    example: 'New Idea',
  })
  @Expose()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Full description of the idea.',
    example:
      'So far, Im just hearing a factual depiction of whats happening here.',
  })
  @Expose()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Unique userId',
    example: 'eyJzdWIiOiIxMjM',
  })
  @Expose()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Idea Department',
    example: 'Офис',
  })
  @Expose()
  @IsString()
  department: string;

  @ApiProperty({
    description: 'Idea SubDepartment',
    example: 'Склад',
  })
  @Expose()
  @IsString()
  subDepartment: string;

  @ApiProperty({
    description: 'Idea Status',
    example: 'New',
  })
  @Expose()
  status: IdeaStatus;

  @ApiProperty({
    description: 'Favorite Ideas Count',
    required: true,
    example: '10',
  })
  @Expose()
  @IsNumber()
  favoriteIdeasCount: number;

  @ApiProperty({
    description: 'Is favorite idea',
    required: true,
    example: 'true',
  })
  @Expose()
  @IsBoolean()
  isFavorite: boolean;

  @ApiProperty({
    description: 'Priority idea',
    required: true,
    example: 'Low',
  })
  @Expose()
  @IsIn(['Low', 'Medium', 'High'])
  priority: boolean;

  @ApiProperty({
    description: 'The number of likes for this idea',
    required: true,
    example: '1',
  })
  @Expose()
  @IsNumber()
  likesCount: number;

  @ApiProperty({
    description: 'The number of dislikes for this idea',
    required: true,
    example: '1',
  })
  @Expose()
  @IsNumber()
  dislikesCount: number;

  @ApiProperty({
    description: 'Reaction type',
    required: true,
    example: 'Like',
  })
  @Expose()
  @IsIn(['None', 'Like', 'Dislike'])
  reactionType: ReactionType;

  @ApiProperty({
    description: 'Idea createdAt',
    example: '2024-12-17T18:24:07.306Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Idea updatedAt',
    example: '2024-12-17T18:24:07.306Z',
  })
  @Expose()
  updatedAt: Date;
}
