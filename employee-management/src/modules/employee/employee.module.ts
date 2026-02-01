import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Employee } from './entities/employee.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { MapModule } from '../maps/map.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]), MapModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService], // useable in auth-module
})
export class EmployeeModule {}
