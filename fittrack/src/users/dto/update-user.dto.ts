// src/users/dto/update-user.dto.ts

import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ example: '9876543210' })
  @IsString()
  @IsOptional()
  mobile: string;

  @ApiPropertyOptional({ example: 25 })
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiPropertyOptional({ example: 72.5 })
  @IsNumber()
  @IsOptional()
  weight: number;

  @ApiPropertyOptional({ example: 175.0 })
  @IsNumber()
  @IsOptional()
  height: number;
}
