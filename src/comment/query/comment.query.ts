import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsIn } from 'class-validator';

const DEFAULT_COMMENT_LIMIT = 20;
const DEFAULT_SORT_DIRECTION = 'asc';

export class CommentQuery {
  @Transform(({ value }) => Number(value) || DEFAULT_COMMENT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_COMMENT_LIMIT;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public page: number;
}
