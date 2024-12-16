import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './dto/department.dto';
import { fillObject } from '@core';
import { DepartmentRdo } from './rdo/departments.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'A new department has been created',
    type: DepartmentRdo,
  })
  public create(@Body() dto: DepartmentDto) {
    return fillObject(DepartmentRdo, this.departmentService.create(dto));
  }

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The full list of departments has been received',
    type: [DepartmentRdo],
  })
  public async findMany() {
    return fillObject(DepartmentRdo, this.departmentService.findMany());
  }
}
