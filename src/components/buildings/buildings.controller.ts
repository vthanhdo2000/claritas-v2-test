import { RemoveImageFromElevationDto } from './dto/remove-images-from-elevation.dto';
import { AddImageToElevationDto } from './dto/add-image-to-elevation.dto';
import { CreateElevationDto } from './dto/create-elevation.dto';
import { CreateBuildingDto } from './dto/create-building.dto';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/constants/user-role.enum';

@ApiTags('buildings')
@ApiBearerAuth()
@Controller('building')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Roles(Role.ADMIN)
  @Post('create-building')
  createBuilding(@Body() dto: CreateBuildingDto) {
    return this.buildingsService.createBuilding(dto);
  }

  @Roles(Role.ADMIN)
  @Get('all-buildings')
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number, default = 1',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    description: 'Page size, default = 10',
  })
  getAllBuildings(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
  ) {
    return this.buildingsService.getAllBuildings(page, size);
  }

  @Get('building-detail/:buildingId')
  @ApiParam({ name: 'buildingId', required: true, description: 'Building ID' })
  getBuildingDetail(
    @Param('buildingId') buildingId: number,
    @Request() req: any,
  ) {
    return this.buildingsService.getBuildingDetail(
      buildingId,
      req.user.userId as number,
    );
  }

  @Get('elevation-detail/:elevationId')
  @ApiParam({
    name: 'elevationId',
    required: true,
    description: 'Elevation ID',
  })
  getElevationDetail(
    @Param('elevationId') elevationId: number,
    @Request() req: any,
  ) {
    return this.buildingsService.getElevationDetail(
      elevationId,
      req.user.userId as number,
    );
  }

  @Post('create-elevation')
  createElevation(@Body() dto: CreateElevationDto, @Request() req: any) {
    return this.buildingsService.createElevation(
      dto,
      req.user.userId as number,
    );
  }

  // @Patch('add-images-to-elevation')
  // addImagesToElevation(
  //   @Body() dto: AddImageToElevationDto,
  //   @Request() req: any,
  // ) {
  //   return this.buildingsService.addImagesToElevation(
  //     dto,
  //     req.user.userId as number,
  //   );
  // }

  // @Patch('remove-images-from-elevation')
  // removeImagesFromElevation(
  //   @Body() dto: RemoveImageFromElevationDto,
  //   @Request() req: any,
  // ) {
  //   return this.buildingsService.removeImagesFromElevation(
  //     dto,
  //     req.user.userId as number,
  //   );
  // }

  @Patch('edit-images-in-elevation')
  replaceImagesInElevation(
    @Body() dto: AddImageToElevationDto,
    @Request() req: any,
  ) {
    return this.buildingsService.editImagesInElevation(
      dto,
      req.user.userId as number,
    );
  }
}
