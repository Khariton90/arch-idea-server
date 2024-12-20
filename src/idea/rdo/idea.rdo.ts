import { IdeaStatus } from '@shared-types/idea-status.type';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

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

  @ApiProperty({
    description: 'Favorite Ideas Count',
    required: true,
    example: '10',
  })
  @Expose()
  @IsNumber()
  favoriteIdeasCount: number;

  @ApiProperty({
    description: 'Disliked Ideas Count',
    required: true,
    example: '10',
  })
  @Expose()
  @IsNumber()
  dislikedIdeasCount: number;

  @ApiProperty({
    description: 'Is favorite Idea',
    required: true,
    example: 'true',
  })
  @Expose()
  @IsBoolean()
  isFavorite: boolean;
}
