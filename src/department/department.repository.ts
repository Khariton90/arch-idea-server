/* eslint-disable @typescript-eslint/no-unused-vars */
import { CRUDRepository } from '@core';
import { DepartmentEntity } from './department.entity';
import { Department } from '@shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentRepository
  implements CRUDRepository<DepartmentEntity, string, Department>
{
  constructor(private readonly prisma: PrismaService) {}

  public async findMany(): Promise<Department[]> {
    return this.prisma.department.findMany();
  }

  public async findById(id: string): Promise<Department | null> {
    return this.prisma.department.findFirst({
      where: { id },
    });
  }

  public async findOne(title: string): Promise<Department | null> {
    return this.prisma.department.findFirst({
      where: { title },
    });
  }

  public async findQrCode(qrCodeHash: string): Promise<Department | null> {
    return this.prisma.department.findFirst({
      where: { qrCodeHash },
    });
  }

  public async create(item: DepartmentEntity): Promise<Department> {
    const data = item.toObject();

    return this.prisma.department.create({
      data: { ...data },
    });
  }

  public async update(id: string, item: DepartmentEntity): Promise<Department> {
    throw new Error('Method not implemented.');
  }

  public async destroy(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
