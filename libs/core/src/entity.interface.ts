export interface Entity<T> {
  toObject(): T;
  fillEntity(entity: T): void;
}
