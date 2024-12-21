import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { UserResponseDto } from 'src/user/rdo/user.rdo';

export class CommentRdo {
  @ApiProperty({
    description: 'Unique comment ID',
    example: 'eyJzdWIiOiIxMjM',
  })
  @Expose()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Comment content',
    example: 'Content',
  })
  @Expose()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Unique idea ID',
    example: 'eyJzdWIiOiIxMjM',
  })
  @Expose()
  @IsString()
  ideaId: string;

  @ApiProperty({ type: UserResponseDto, description: 'User data object' })
  @Expose()
  @Type(() => UserResponseDto)
  @ValidateNested({ each: true })
  @Expose()
  user: UserResponseDto;

  @ApiProperty({
    description: 'Comment createdAt',
    example: '2024-12-17T18:24:07.306Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Comment updatedAt',
    example: '2024-12-17T18:24:07.306Z',
  })
  @Expose()
  updatedAt: Date;
}

export class CommentsResponseDto {
  @ApiProperty({ type: Number, description: 'Total number of comments' })
  @Expose()
  @IsNumber()
  totalCount: number;

  @ApiProperty({ type: [CommentRdo], description: 'List of comments' })
  @Expose()
  @Type(() => CommentRdo)
  @ValidateNested({ each: true })
  comments: CommentRdo[];
}
