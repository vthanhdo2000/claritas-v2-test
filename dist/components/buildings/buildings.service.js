"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingsService = void 0;
const elevation_image_repository_1 = require("./repositories/elevation-image.repository");
const elevation_repository_1 = require("./repositories/elevation.repository");
const user_building_repository_1 = require("./repositories/user-building.repository");
const building_repository_1 = require("./repositories/building.repository");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let BuildingsService = class BuildingsService {
    constructor(buildingRepository, userBuildingRepository, elevationRepository, elevationImageRepository, connection) {
        this.buildingRepository = buildingRepository;
        this.userBuildingRepository = userBuildingRepository;
        this.elevationRepository = elevationRepository;
        this.elevationImageRepository = elevationImageRepository;
        this.connection = connection;
    }
    async createBuilding(dto) {
        const building = this.buildingRepository.create(dto);
        return await this.buildingRepository.save(building);
    }
    async getAllBuildings(page, size) {
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
    async getBuildingDetail(buildingId, userId) {
        const building = await this.buildingRepository.findOne(buildingId);
        if (!building) {
            throw new common_1.BadRequestException('Building not found');
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
    async checkUserBuilding(user_id, building_id) {
        const userBuilding = await this.userBuildingRepository.findOne({
            where: {
                user_id,
                building_id,
            },
        });
        if (!userBuilding) {
            throw new common_1.BadRequestException('User does not have access to this building');
        }
        return userBuilding;
    }
    async checkElevationExists(elevation_id) {
        const elevation = await this.elevationRepository.findOne(elevation_id);
        if (!elevation) {
            throw new common_1.BadRequestException('Elevation not found');
        }
        return elevation;
    }
    async getElevationDetail(elevationId, userId) {
        const elevation = await this.checkElevationExists(elevationId);
        await this.checkUserBuilding(userId, elevation.building_id);
        return {
            elevation,
        };
    }
    async createElevation(dto, userId) {
        await this.checkUserBuilding(userId, dto.building_id);
        const elevation = this.elevationRepository.create(dto);
        const elevationCreated = await this.elevationRepository.save(elevation);
        return 'Elevation created';
    }
    async addImagesToElevation(dto, userId) {
        const { images } = dto, info = __rest(dto, ["images"]);
        await this.checkUserBuilding(userId, info.building_id);
        const elevation = await this.elevationRepository.findOne(info.elevation_id);
        if (!elevation) {
            throw new common_1.BadRequestException('Elevation not found');
        }
        const elevationImages = images.map((image) => ({
            elevation_id: info.elevation_id,
            url: image.url,
            order: image.order,
        }));
        const newImages = await this.elevationImageRepository.create(elevationImages);
        await this.elevationImageRepository.save(newImages);
        return 'Added images to elevation';
    }
    async removeImagesFromElevation(dto, userId) {
        const { orders, building_id, elevation_id } = dto;
        await this.checkUserBuilding(userId, building_id);
        await this.checkElevationExists(elevation_id);
        await this.elevationImageRepository.delete({
            order: (0, typeorm_2.In)(orders),
            elevation_id,
        });
        return 'Removed';
    }
    async editImagesInElevation(dto, userId) {
        const { building_id, elevation_id } = dto, rest = __rest(dto, ["building_id", "elevation_id"]);
        await this.checkUserBuilding(userId, building_id);
        await this.checkElevationExists(elevation_id);
        await this.elevationRepository.update({ id: elevation_id }, Object.assign({}, rest));
        return 'Images updated';
    }
};
BuildingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(building_repository_1.BuildingRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(user_building_repository_1.UserBuildingRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(elevation_repository_1.ElevationRepository)),
    __param(3, (0, typeorm_1.InjectRepository)(elevation_image_repository_1.ElevationImageRepository)),
    __metadata("design:paramtypes", [building_repository_1.BuildingRepository,
        user_building_repository_1.UserBuildingRepository,
        elevation_repository_1.ElevationRepository,
        elevation_image_repository_1.ElevationImageRepository,
        typeorm_2.Connection])
], BuildingsService);
exports.BuildingsService = BuildingsService;
//# sourceMappingURL=buildings.service.js.map