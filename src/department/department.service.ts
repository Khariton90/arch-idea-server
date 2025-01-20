import { Injectable, NotFoundException } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { DepartmentDto } from './dto/department.dto';
import { DepartmentEntity } from './department.entity';

@Injectable()
export class DepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  public async create(dto: DepartmentDto) {
    try {
      const entity = new DepartmentEntity({
        title: dto.title,
        qrCodeHash: dto.title,
      });

      await entity.setHash(dto.title);
      return await this.departmentRepository.create(entity);
    } catch {
      throw new NotFoundException();
    }
  }

  public async findMany() {
    try {
      return await this.departmentRepository.findMany();
    } catch {
      throw new NotFoundException();
    }
  }
}
