import { Body, Controller, Get, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './dto/department.dto';
import { fillObject } from '@core';
import { DepartmentRdo } from './rdo/departments.rdo';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('/create')
  public create(@Body() dto: DepartmentDto) {
    return fillObject(DepartmentRdo, this.departmentService.create(dto));
  }

  @Get('/')
  public async findMany() {
    return fillObject(DepartmentRdo, this.departmentService.findMany());
  }
}
