import { ClassConstructor, plainToInstance } from 'class-transformer';

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });
}

export function replaceNullWithEmpty(value: string | null): string {
  return value ?? '';
}
