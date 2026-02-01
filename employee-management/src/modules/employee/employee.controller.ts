import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, ParseIntPipe, Query, Patch } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)     // please comment out if you want to protect employees routes
@Controller('employees')
export class EmployeeController {
  constructor(private empService: EmployeeService) { }

  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    console.log(dto)
    return this.empService.create(dto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query('search') search = '',) {
    return this.empService.findAll(+page, +limit, search);
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.empService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEmployeeDto) {
    return this.empService.update(id, dto);
  }

  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.empService.remove(id);
  }

  @Get('/:email')
  findByEmail(@Param('email') email: string) {
    return this.empService.findByEmail(email);
  }

}
