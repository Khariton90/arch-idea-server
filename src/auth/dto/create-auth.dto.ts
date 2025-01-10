import { Expose } from 'class-transformer';

export class CreateAuthDto {
  @Expose()
  password: string;
  @Expose()
  login: string;

  @Expose()
  modelName: string;
}
