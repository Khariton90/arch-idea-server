import { CRUDRepository } from '@core';
import { UserEntity } from './user.entity';
import { User } from '@shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserQuery } from './query/user.query';

@Injectable()
export class UserRepository
  implements CRUDRepository<UserEntity, string, User>
{
  constructor(private readonly prisma: PrismaService) {}

  public async findTotalCount() {
    return await this.prisma.user.count({
      where: {
        NOT: {
          role: 'Admin',
        },
      },
    });
  }

  public async findMany({ limit, sortDirection, page, department }: UserQuery) {
    const count = await this.prisma.user.count({
      where: {
        department: department ? department : undefined,
        NOT: {
          role: 'Admin',
        },
      },
      take: limit,
      orderBy: [{ createdAt: sortDirection }],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });

    const users = await this.prisma.user.findMany({
      where: {
        department: department ? department : undefined,
        NOT: {
          role: 'Admin',
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return { users, count };
  }

  public async findById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  public async findByLogin(login: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { login },
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
