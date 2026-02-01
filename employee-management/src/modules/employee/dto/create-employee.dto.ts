import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  designation: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  address: string;
}
