import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UpdateIdeaDto {
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
}
