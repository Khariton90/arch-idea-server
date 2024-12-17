import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsIn } from 'class-validator';

const DEFAULT_IDEA_LIMIT = 10;
const DEFAULT_SORT_DIRECTION = 'asc';

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
}
