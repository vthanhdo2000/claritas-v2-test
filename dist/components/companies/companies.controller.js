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
exports.CompaniesController = void 0;
const create_company_dto_1 = require("./dto/create-company.dto");
const roles_decorator_1 = require("./../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/constants/user-role.enum");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const companies_service_1 = require("./companies.service");
let CompaniesController = class CompaniesController {
    constructor(companiesService) {
        this.companiesService = companiesService;
    }
    create(dto) {
        return this.companiesService.create(dto);
    }
    getAll(page, size) {
        return this.companiesService.getAll(page, size);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.Role.ADMIN),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_dto_1.CreateCompanyDto]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.Role.ADMIN),
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
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "getAll", null);
CompaniesController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('companies'),
    (0, common_1.Controller)('company'),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService])
], CompaniesController);
exports.CompaniesController = CompaniesController;
//# sourceMappingURL=companies.controller.js.map