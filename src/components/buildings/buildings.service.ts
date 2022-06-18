import { ElevationImage } from './entities/elevation-image.entity';
import { RemoveImageFromElevationDto } from './dto/remove-images-from-elevation.dto';
import { AddImageToElevationDto } from './dto/add-image-to-elevation.dto';
import { CreateElevationDto } from './dto/create-elevation.dto';
import { ElevationImageRepository } from './repositories/elevation-image.repository';
import { ElevationRepository } from './repositories/elevation.repository';
import { UserBuildingRepository } from './repositories/user-building.repository';
import { CreateBuildingDto } from './dto/create-building.dto';
import { BuildingRepository } from './repositories/building.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, In } from 'typeorm';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(BuildingRepository)
    private readonly buildingRepository: BuildingRepository,
    @InjectRepository(UserBuildingRepository)
    private readonly userBuildingRepository: UserBuildingRepository,
    @InjectRepository(ElevationRepository)
    private readonly elevationRepository: ElevationRepository,
    @InjectRepository(ElevationImageRepository)
    private readonly elevationImageRepository: ElevationImageRepository,
    private connection: Connection,
  ) {}

  async createBuilding(dto: CreateBuildingDto) {
    const building = this.buildingRepository.create(dto);
    return await this.buildingRepository.save(building);
  }

  async getAllBuildings(page: number, size: number) {
    const count = await this.buildingRepository.count();
    const maxPage = Math.ceil(count / size);
    const hasNext = page < maxPage;
    const buildings = await this.buildingRepository.find({
      skip: (page - 1) * size,
      take: size,
    });
    return {
      buildings,
      hasNext,
      page,
      maxPage,
    };
  }

  async getBuildingDetail(buildingId: number, userId: number) {
    const building = await this.buildingRepository.findOne(buildingId);
    if (!building) {
      throw new BadRequestException('Building not found');
    }
    await this.checkUserBuilding(userId, buildingId);
    const elevations = await this.elevationRepository.find({
      where: {
        building_id: buildingId,
      },
    });
    return {
      building,
      elevations,
    };
  }

  async checkUserBuilding(user_id: number, building_id: number) {
    const userBuilding = await this.userBuildingRepository.findOne({
      where: {
        user_id,
        building_id,
      },
    });
    if (!userBuilding) {
      throw new BadRequestException(
        'User does not have access to this building',
      );
    }
    return userBuilding;
  }

  async checkElevationExists(elevation_id: number) {
    const elevation = await this.elevationRepository.findOne(elevation_id);
    if (!elevation) {
      throw new BadRequestException('Elevation not found');
    }
    return elevation;
  }

  async getElevationDetail(elevationId: number, userId: number) {
    const elevation = await this.checkElevationExists(elevationId);
    await this.checkUserBuilding(userId, elevation.building_id);

    // const elevationImages = await this.elevationImageRepository.find({
    //   where: {
    //     elevation_id: elevationId,
    //   },
    // });
    return {
      elevation,
      // elevationImages,
    };
  }

  async createElevation(dto: CreateElevationDto, userId: number) {
    await this.checkUserBuilding(userId, dto.building_id);
    const elevation = this.elevationRepository.create(dto);
    const elevationCreated = await this.elevationRepository.save(elevation);
    // const elevationImages = images.map((image, idx) => {
    //   return {
    //     elevation_id: elevationCreated.id,
    //     url: image,
    //     order: idx + 1,
    //   };
    // });

    // await this.elevationImageRepository.save(elevationImages);
    return 'Elevation created';
  }

  async addImagesToElevation(dto: AddImageToElevationDto, userId: number) {
    const { images, ...info } = dto;
    await this.checkUserBuilding(userId, info.building_id);
    const elevation = await this.elevationRepository.findOne(info.elevation_id);
    if (!elevation) {
      throw new BadRequestException('Elevation not found');
    }
    const elevationImages = images.map((image) => ({
      elevation_id: info.elevation_id,
      url: image.url,
      order: image.order,
    }));
    const newImages = await this.elevationImageRepository.create(
      elevationImages,
    );
    await this.elevationImageRepository.save(newImages);
    return 'Added images to elevation';
  }

  async removeImagesFromElevation(
    dto: RemoveImageFromElevationDto,
    userId: number,
  ) {
    const { orders, building_id, elevation_id } = dto;
    await this.checkUserBuilding(userId, building_id);
    await this.checkElevationExists(elevation_id);
    await this.elevationImageRepository.delete({
      order: In(orders),
      elevation_id,
    });
    return 'Removed';
  }

  async editImagesInElevation(dto: AddImageToElevationDto, userId: number) {
    const { building_id, elevation_id, ...rest } = dto;
    await this.checkUserBuilding(userId, building_id);
    await this.checkElevationExists(elevation_id);
    await this.elevationRepository.update({ id: elevation_id }, { ...rest });
    // const queryRunner = this.connection.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   Promise.all(
    //     images.map(async (image) => {
    //       await queryRunner.manager.update(
    //         ElevationImage,
    //         {
    //           elevation_id,
    //           order: image.order,
    //         },
    //         { url: image.url },
    //       );
    //     }),
    //   );
    //   queryRunner.commitTransaction();
    //   queryRunner.release();
    // } catch (e) {
    //   queryRunner.rollbackTransaction();
    //   queryRunner.release();
    //   throw new BadRequestException();
    // }
    return 'Images updated';
  }
}
