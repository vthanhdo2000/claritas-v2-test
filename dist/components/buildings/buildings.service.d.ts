import { RemoveImageFromElevationDto } from './dto/remove-images-from-elevation.dto';
import { AddImageToElevationDto } from './dto/add-image-to-elevation.dto';
import { CreateElevationDto } from './dto/create-elevation.dto';
import { ElevationImageRepository } from './repositories/elevation-image.repository';
import { ElevationRepository } from './repositories/elevation.repository';
import { UserBuildingRepository } from './repositories/user-building.repository';
import { CreateBuildingDto } from './dto/create-building.dto';
import { BuildingRepository } from './repositories/building.repository';
import { Connection } from 'typeorm';
export declare class BuildingsService {
    private readonly buildingRepository;
    private readonly userBuildingRepository;
    private readonly elevationRepository;
    private readonly elevationImageRepository;
    private connection;
    constructor(buildingRepository: BuildingRepository, userBuildingRepository: UserBuildingRepository, elevationRepository: ElevationRepository, elevationImageRepository: ElevationImageRepository, connection: Connection);
    createBuilding(dto: CreateBuildingDto): Promise<import("./entities/building.entity").Building>;
    getAllBuildings(page: number, size: number): Promise<{
        buildings: import("./entities/building.entity").Building[];
        hasNext: boolean;
        page: number;
        maxPage: number;
    }>;
    getBuildingDetail(buildingId: number, userId: number): Promise<{
        building: import("./entities/building.entity").Building;
        elevations: import("./entities/elevation.entity").Elevation[];
    }>;
    checkUserBuilding(user_id: number, building_id: number): Promise<import("./entities/user-building.entity").UserBuilding>;
    checkElevationExists(elevation_id: number): Promise<import("./entities/elevation.entity").Elevation>;
    getElevationDetail(elevationId: number, userId: number): Promise<{
        elevation: import("./entities/elevation.entity").Elevation;
    }>;
    createElevation(dto: CreateElevationDto, userId: number): Promise<string>;
    addImagesToElevation(dto: AddImageToElevationDto, userId: number): Promise<string>;
    removeImagesFromElevation(dto: RemoveImageFromElevationDto, userId: number): Promise<string>;
    editImagesInElevation(dto: AddImageToElevationDto, userId: number): Promise<string>;
}
