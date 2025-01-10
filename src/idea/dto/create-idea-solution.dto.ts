import { IdeaStatus } from '@shared-types';
import { Expose } from 'class-transformer';

export class CreateIdeaSolutionDto {
  @Expose()
  status: IdeaStatus = 'New';

  @Expose()
  solution: string;
}
