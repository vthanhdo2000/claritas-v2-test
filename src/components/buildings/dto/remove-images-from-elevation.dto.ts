import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt } from 'class-validator';

export class RemoveImageFromElevationDto {
  @IsInt()
  @ApiProperty()
  elevation_id: number;

  @IsInt()
  @ApiProperty()
  building_id: number;

  @IsArray()
  @ApiProperty({ type: [Number] })
  orders: number[];
}
