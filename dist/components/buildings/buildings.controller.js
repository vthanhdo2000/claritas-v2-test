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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingsController = void 0;
const add_image_to_elevation_dto_1 = require("./dto/add-image-to-elevation.dto");
const create_elevation_dto_1 = require("./dto/create-elevation.dto");
const create_building_dto_1 = require("./dto/create-building.dto");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const buildings_service_1 = require("./buildings.service");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/constants/user-role.enum");
let BuildingsController = class BuildingsController {
    constructor(buildingsService) {
        this.buildingsService = buildingsService;
    }
    createBuilding(dto) {
        return this.buildingsService.createBuilding(dto);
    }
    getAllBuildings(page, size) {
        return this.buildingsService.getAllBuildings(page, size);
    }
    getBuildingDetail(buildingId, req) {
        return this.buildingsService.getBuildingDetail(buildingId, req.user.userId);
    }
    getElevationDetail(elevationId, req) {
        return this.buildingsService.getElevationDetail(elevationId, req.user.userId);
    }
    createElevation(dto, req) {
        return this.buildingsService.createElevation(dto, req.user.userId);
    }
    replaceImagesInElevation(dto, req) {
        return this.buildingsService.editImagesInElevation(dto, req.user.userId);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.Role.ADMIN),
    (0, common_1.Post)('create-building'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_building_dto_1.CreateBuildingDto]),
    __metadata("design:returntype", void 0)
], BuildingsController.prototype, "createBuilding", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.Role.ADMIN),
    (0, common_1.Get)('all-buildings'),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        description: 'Page number, default = 1',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'size',
        required: false,
        description: 'Page size, default = 10',
    }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], BuildingsController.prototype, "getAllBuildings", null);
__decorate([
    (0, common_1.Get)('building-detail/:buildingId'),
    (0, swagger_1.ApiParam)({ name: 'buildingId', required: true, description: 'Building ID' }),
    __param(0, (0, common_1.Param)('buildingId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], BuildingsController.prototype, "getBuildingDetail", null);
__decorate([
    (0, common_1.Get)('elevation-detail/:elevationId'),
    (0, swagger_1.ApiParam)({
        name: 'elevationId',
        required: true,
        description: 'Elevation ID',
    }),
    __param(0, (0, common_1.Param)('elevationId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], BuildingsController.prototype, "getElevationDetail", null);
__decorate([
    (0, common_1.Post)('create-elevation'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_elevation_dto_1.CreateElevationDto, Object]),
    __metadata("design:returntype", void 0)
], BuildingsController.prototype, "createElevation", null);
__decorate([
    (0, common_1.Patch)('edit-images-in-elevation'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_image_to_elevation_dto_1.AddImageToElevationDto, Object]),
    __metadata("design:returntype", void 0)
], BuildingsController.prototype, "replaceImagesInElevation", null);
BuildingsController = __decorate([
    (0, swagger_1.ApiTags)('buildings'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('building'),
    __metadata("design:paramtypes", [buildings_service_1.BuildingsService])
], BuildingsController);
exports.BuildingsController = BuildingsController;
//# sourceMappingURL=buildings.controller.js.map