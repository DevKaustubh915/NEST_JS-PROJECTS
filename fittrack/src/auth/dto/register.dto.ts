import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: '9876543210' })
  @IsString()
  @IsOptional()
  mobile: string;

  @ApiPropertyOptional({ example: 25 })
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiPropertyOptional({ example: 70.5 })
  @IsNumber()
  @IsOptional()
  weight: number;

  @ApiPropertyOptional({ example: 175.0 })
  @IsNumber()
  @IsOptional()
  height: number;
}
