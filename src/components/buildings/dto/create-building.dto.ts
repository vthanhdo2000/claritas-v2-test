import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUrl } from 'class-validator';

export class CreateBuildingDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsUrl()
  @ApiProperty()
  thumbnail: string;

  @IsInt()
  @ApiProperty()
  company_id: number;
}
