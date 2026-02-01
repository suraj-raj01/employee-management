import 'dotenv/config';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'employee_db',

  entities: [Employee],

  synchronize: true,
  logging: false,
});
