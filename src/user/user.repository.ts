/* eslint-disable @typescript-eslint/no-unused-vars */
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

  public async findMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public async findById(id: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  public async create(item: UserEntity): Promise<User> {
    const data = item.toObject();

    return await this.prisma.user.create({
      data: {
        ...data,
      },
    });
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    const data = item.toObject();

    return await this.prisma.user.update({
      where: { id },
      data: data,
    });
  }

  public async destroy(_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
