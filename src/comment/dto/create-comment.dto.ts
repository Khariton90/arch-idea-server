import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment content',
    example: 'Im just hearing a factual depiction of whats happening here.',
  })
  @Expose()
  @IsString()
  content: string;
}
