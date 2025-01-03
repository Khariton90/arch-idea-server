import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { DepartmentDto } from './dto/department.dto';
import { DepartmentEntity } from './department.entity';

// const CONFLICT_DEPARTMENT_MESSAGE = 'Such a department already exists';

@Injectable()
export class DepartmentService {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  public async create(dto: DepartmentDto) {
    const entity = new DepartmentEntity({
      title: dto.title,
      qrCodeHash: dto.title,
    });

    await entity.setHash(dto.title);
    return await this.departmentRepository.create(entity);
  }

  public async findMany() {
    return await this.departmentRepository.findMany();
  }
}
