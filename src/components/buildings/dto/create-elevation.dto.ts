import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsString } from 'class-validator';

interface Image {
  order: number;
  url: string;
}
export class CreateElevationDto {
  @IsInt()
  @ApiProperty()
  building_id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsInt()
  @ApiProperty()
  direction: number;

  @IsInt()
  @ApiProperty()
  rows: number;

  @IsInt()
  @ApiProperty()
  columns: number;

  @IsArray()
  @ApiProperty({ type: [Object] })
  images: Image[];
}
