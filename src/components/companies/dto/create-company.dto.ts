import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  thumbnail?: string;
}
