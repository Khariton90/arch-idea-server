import { Entity } from '@core';
import { Location, User, UserRole, UserStatus } from '@shared-types';
import { compare, genSalt, hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_USER_NAME = 'Анонимный';
const DEFAULT_USER_LASTNAME = 'Пользователь';
const SALT_ROUNDS = 10;

export class UserEntity implements Entity<UserEntity>, User {
  firstName: string;
  lastName: string;
  department: Location;
  id: string;
  role: UserRole;
  status?: UserStatus;
  favoriteIdeasCount?: number;
  myIdeasCount?: number;
  isDeleted?: boolean;
  passwordHash?: string;
  login: string;
  modelName?: string;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public generateUniqueLogin(department: string): string {
    const prefix = `${department.slice(0, 3)}_user`;
    const randomPart = uuidv4().slice(-8);
    return `${prefix}_${randomPart}`.toLowerCase();
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(user: User) {
    this.id = user.id;
    this.department = user.department;
    this.firstName = user.firstName ?? DEFAULT_USER_NAME;
    this.lastName = user.lastName ?? DEFAULT_USER_LASTNAME;
    this.role = user.role ?? 'User';
    this.status = user.status ?? 'NotVerified';
    this.favoriteIdeasCount = user.favoriteIdeasCount ?? 0;
    this.myIdeasCount = user.myIdeasCount ?? 0;
    this.isDeleted = user.isDeleted ?? false;
    this.passwordHash = user.passwordHash ?? '';
    this.login = user.login ?? this.generateUniqueLogin(user.department);
  }
}
