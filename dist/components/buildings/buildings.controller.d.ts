import { AddImageToElevationDto } from './dto/add-image-to-elevation.dto';
import { CreateElevationDto } from './dto/create-elevation.dto';
import { CreateBuildingDto } from './dto/create-building.dto';
import { BuildingsService } from './buildings.service';
export declare class BuildingsController {
    private readonly buildingsService;
    constructor(buildingsService: BuildingsService);
    createBuilding(dto: CreateBuildingDto): Promise<import("./entities/building.entity").Building>;
    getAllBuildings(page: number, size: number): Promise<{
        buildings: import("./entities/building.entity").Building[];
        hasNext: boolean;
        page: number;
        maxPage: number;
    }>;
    getBuildingDetail(buildingId: number, req: any): Promise<{
        building: import("./entities/building.entity").Building;
        elevations: import("./entities/elevation.entity").Elevation[];
    }>;
    getElevationDetail(elevationId: number, req: any): Promise<{
        elevation: import("./entities/elevation.entity").Elevation;
    }>;
    createElevation(dto: CreateElevationDto, req: any): Promise<string>;
    replaceImagesInElevation(dto: AddImageToElevationDto, req: any): Promise<string>;
}
