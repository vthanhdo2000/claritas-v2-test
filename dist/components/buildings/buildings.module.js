"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingsModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const elevation_image_repository_1 = require("./repositories/elevation-image.repository");
const elevation_repository_1 = require("./repositories/elevation.repository");
const user_building_repository_1 = require("./repositories/user-building.repository");
const building_repository_1 = require("./repositories/building.repository");
const common_1 = require("@nestjs/common");
const buildings_service_1 = require("./buildings.service");
const buildings_controller_1 = require("./buildings.controller");
const uploads_module_1 = require("../uploads/uploads.module");
let BuildingsModule = class BuildingsModule {
};
BuildingsModule = __decorate([
    (0, common_1.Module)({
        controllers: [buildings_controller_1.BuildingsController],
        providers: [buildings_service_1.BuildingsService],
        imports: [
            building_repository_1.BuildingRepository,
            user_building_repository_1.UserBuildingRepository,
            elevation_repository_1.ElevationRepository,
            elevation_image_repository_1.ElevationImageRepository,
            uploads_module_1.UploadsModule,
            typeorm_1.TypeOrmModule.forFeature([
                building_repository_1.BuildingRepository,
                user_building_repository_1.UserBuildingRepository,
                elevation_repository_1.ElevationRepository,
                elevation_image_repository_1.ElevationImageRepository,
            ]),
        ],
    })
], BuildingsModule);
exports.BuildingsModule = BuildingsModule;
//# sourceMappingURL=buildings.module.js.map