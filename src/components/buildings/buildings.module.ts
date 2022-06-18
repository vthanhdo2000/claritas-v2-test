import { TypeOrmModule } from '@nestjs/typeorm';
import { ElevationImageRepository } from './repositories/elevation-image.repository';
import { ElevationRepository } from './repositories/elevation.repository';
import { UserBuildingRepository } from './repositories/user-building.repository';
import { BuildingRepository } from './repositories/building.repository';
import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  controllers: [BuildingsController],
  providers: [BuildingsService],
  imports: [
    BuildingRepository,
    UserBuildingRepository,
    ElevationRepository,
    ElevationImageRepository,
    UploadsModule,
    TypeOrmModule.forFeature([
      BuildingRepository,
      UserBuildingRepository,
      ElevationRepository,
      ElevationImageRepository,
    ]),
  ],
})
export class BuildingsModule {}
