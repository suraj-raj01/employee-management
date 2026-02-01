import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { typeOrmConfig } from './config/db.config';
import { MapModule } from './modules/maps/map.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true,envFilePath: '.env', }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
    EmployeeModule,
    MapModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
