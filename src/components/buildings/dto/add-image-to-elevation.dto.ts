import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional } from 'class-validator';

interface ImageWithOrderInterface {
  order: number;
  url: string;
}

export class AddImageToElevationDto {
  @IsInt()
  @ApiProperty()
  elevation_id: number;

  @IsInt()
  @ApiProperty()
  building_id: number;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  rows?: number;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  columns?: number;

  @IsArray()
  @ApiProperty({ type: [Object] })
  images: ImageWithOrderInterface[];
}
