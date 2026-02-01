import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { hashPassword } from '../../utils/password.util';
import { calculateDistance } from 'src/utils/map';
import { MapService } from '../maps/map.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    private readonly mapService: MapService,
  ) { }

  // CREATE EMPLOYEE
  async create(dto: CreateEmployeeDto) {
    try {
      // Check Email check
      const existing = await this.employeeRepo.findOne({
        where: { email: dto.email },
      });

      if (existing) {
        throw new ConflictException('Email already exists');
      }

      // Hash password
      const hashedPassword = await hashPassword(dto.password);


      // Google Map → get latitude/longitude from address
      const { latitude, longitude } = await this.mapService.getLatLng(dto.address);

      // Create entity
      const employee = this.employeeRepo.create({
        latitude,
        longitude,
        name: dto.name,
        email: dto.email,
        designation: dto.designation,
        password: hashedPassword,
      });

      // 5️⃣ Save
      const saved = await this.employeeRepo.save(employee);

      return {
        success: true,
        message: 'Employee created successfully',
        data: saved,
      };

    } catch (error) {
      // email conflict
      if (error instanceof ConflictException) {
        throw error;
      }

      // postgres unique constraint
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }

      throw new InternalServerErrorException(
        'Failed to create employee',
      );
    }
  }


  // GET ALL
  async findAll(page: number, limit: number, search: string) {
    try {
      const query = this.employeeRepo.createQueryBuilder('employee');

      // Search
      if (search) {
        query.andWhere(
          '(LOWER(employee.email) LIKE :search OR LOWER(employee.name) LIKE :search)',
          { search: `%${search}%` }
        );
      }

      // Pagination + sorting
      const [data, total] = await query
        .orderBy('employee.name', 'ASC')
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      const totalPages = Math.ceil(total / limit);

      return {
        success: true,
        message: 'Employees fetched successfully',
        data,
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch employees',
      );
    }
  }


  // GET ONE
  async findOne(id: number) {
    try {
      const emp = await this.employeeRepo.findOneBy({ id });

      if (!emp) {
        throw new NotFoundException('Employee not found');
      }

      return {
        success: true,
        message: 'Employee fetched successfully',
        data: emp,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to fetch employee',
      );
    }
  }

  // UPDATE
  async update(id: number, dto: UpdateEmployeeDto) {
    try {
      const emp = await this.employeeRepo.findOne({
        where: { id },
      });

      if (!emp) {
        throw new NotFoundException('Employee not found');
      }

      // merge old + new data
      const updatedEmployee = this.employeeRepo.merge(emp, dto);

      const saved = await this.employeeRepo.save(updatedEmployee);

      return {
        success: true,
        message: 'Employee updated successfully',
        data: saved,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to update employee',
      );
    }
  }


  // DELETE
  async remove(id: number) {
    try {
      const emp = await this.employeeRepo.findOneBy({ id });

      if (!emp) {
        throw new NotFoundException('Employee not found');
      }

      await this.employeeRepo.delete(id);

      return {
        success: true,
        message: 'Employee deleted successfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to delete employee',
      );
    }
  }

  // FIND BY EMAIL
  async findByEmail(email: string) {
    return this.employeeRepo.findOne({ where: { email } });
  }

}
