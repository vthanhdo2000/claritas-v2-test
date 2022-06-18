import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsInt, IsString, MaxLength } from 'class-validator';

export class CreateUserByAdminDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  // @ApiProperty({ required: false })
  // @IsString()
  // @MaxLength(40)
  // @IsOptional()
  // first_name?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(40)
  username: string;

  @IsInt()
  @ApiProperty()
  company_id: number;

  @IsArray()
  @ApiProperty({ type: [Number] })
  building_ids: number[];

  // @ApiProperty()
  // @IsString()
  // password: string;
}
