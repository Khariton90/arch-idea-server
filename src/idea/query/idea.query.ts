import { Location } from '@shared-types';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsIn, IsString } from 'class-validator';

const DEFAULT_IDEA_LIMIT = 10;
const DEFAULT_SORT_DIRECTION = 'desc';

export class IdeaQuery {
  @Transform(({ value }) => Number(value) || DEFAULT_IDEA_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_IDEA_LIMIT;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page: number;

  @IsString()
  @IsOptional()
  public department?: Location = undefined;
}
