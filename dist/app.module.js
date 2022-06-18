"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const elevation_image_entity_1 = require("./components/buildings/entities/elevation-image.entity");
const user_building_entity_1 = require("./components/buildings/entities/user-building.entity");
const elevation_entity_1 = require("./components/buildings/entities/elevation.entity");
const building_entity_1 = require("./components/buildings/entities/building.entity");
const company_entity_1 = require("./components/companies/entities/company.entity");
const file_data_entity_1 = require("./components/uploads/entities/file-data.entity");
const user_entity_1 = require("./components/users/entities/user.entity");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("./config/config");
const users_module_1 = require("./components/users/users.module");
const companies_module_1 = require("./components/companies/companies.module");
const buildings_module_1 = require("./components/buildings/buildings.module");
const uploads_module_1 = require("./components/uploads/uploads.module");
const { database, host, password, port, username } = config_1.db;
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host,
                port,
                username,
                database,
                password,
                synchronize: false,
                logging: process.env.NODE_ENV === 'production' ? false : true,
                extra: {
                    ssl: {
                        rejectUnauthorized: false,
                    },
                },
                entities: [
                    user_entity_1.User,
                    file_data_entity_1.FileData,
                    company_entity_1.Company,
                    building_entity_1.Building,
                    elevation_entity_1.Elevation,
                    user_building_entity_1.UserBuilding,
                    elevation_image_entity_1.ElevationImage,
                ],
            }),
            users_module_1.UsersModule,
            companies_module_1.CompaniesModule,
            buildings_module_1.BuildingsModule,
            uploads_module_1.UploadsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true,
                    validationError: { target: false, value: false },
                    exceptionFactory: (validationErrors = []) => {
                        return new common_1.BadRequestException(validationErrors);
                    },
                }),
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map