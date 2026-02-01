import { IsNotEmpty, IsString } from 'class-validator';

export class ReverseGeocodeDto {
  @IsString()
  @IsNotEmpty()
  latitude: string;

  @IsString()
  @IsNotEmpty()
  longitude: string;
}
