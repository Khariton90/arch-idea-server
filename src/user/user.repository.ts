import { CRUDRepository } from '@core';
import { UserEntity } from './user.entity';
import { Role, User } from '@shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository
  implements CRUDRepository<UserEntity, string, User>
{
  constructor(private readonly prisma: PrismaService) {}

  public async findById(_id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  public async create(item: UserEntity): Promise<User> {
    const data = item.toObject();

    return await this.prisma.user.create({
      data: { ...data },
    });
  }

  public async update(_id: string, _item: UserEntity): Promise<User> {
    throw new Error('Method not implemented.');
  }

  public async destroy(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
