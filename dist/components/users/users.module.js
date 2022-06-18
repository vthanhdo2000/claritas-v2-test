"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const company_repository_1 = require("./../companies/repositories/company.repository");
const building_repository_1 = require("./../buildings/repositories/building.repository");
const user_building_repository_1 = require("./../buildings/repositories/user-building.repository");
const jwt_constant_1 = require("./constants/jwt.constant");
const user_repository_1 = require("./repositories/user.repository");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("./auth.service");
const roles_guard_1 = require("./guards/roles.guard");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const local_strategy_1 = require("./strategies/local.strategy");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [
            users_service_1.UsersService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            auth_service_1.AuthService,
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
        ],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_repository_1.UserRepository,
                user_building_repository_1.UserBuildingRepository,
                building_repository_1.BuildingRepository,
                company_repository_1.CompanyRepository,
            ]),
            jwt_1.JwtModule.register({
                secret: jwt_constant_1.jwtConstants.secret,
                signOptions: { expiresIn: jwt_constant_1.jwtConstants.expiresIn },
            }),
        ],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map