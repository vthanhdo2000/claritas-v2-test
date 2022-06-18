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
exports.UsersService = void 0;
const company_repository_1 = require("./../companies/repositories/company.repository");
const user_building_entity_1 = require("./../buildings/entities/user-building.entity");
const building_repository_1 = require("./../buildings/repositories/building.repository");
const user_building_repository_1 = require("./../buildings/repositories/user-building.repository");
const user_repository_1 = require("./repositories/user.repository");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const argon2 = require("argon2");
const user_role_enum_1 = require("../../common/constants/user-role.enum");
let UsersService = class UsersService {
    constructor(userRepository, userBuildingRepository, buildingRepository, companyRepository) {
        this.userRepository = userRepository;
        this.userBuildingRepository = userBuildingRepository;
        this.buildingRepository = buildingRepository;
        this.companyRepository = companyRepository;
    }
    async register(_a) {
        var { password } = _a, info = __rest(_a, ["password"]);
        const user = await this.userRepository.findOne({
            email: info.email,
        });
        if (user) {
            throw new common_1.BadRequestException('User already exists');
        }
        const hashedPassword = await argon2.hash(password);
        const newUser = this.userRepository.create(Object.assign(Object.assign({}, info), { password: hashedPassword, role: user_role_enum_1.Role.CLIENT_OWNER }));
        await this.userRepository.save(newUser);
        return 'User created';
    }
    async registerAdmin({ company_id, email, username, building_ids, }) {
        const user = await this.userRepository.findOne({
            email,
        });
        if (user) {
            throw new common_1.BadRequestException('User already exists');
        }
        const buildings = await this.buildingRepository.findByIds(building_ids);
        if (buildings.length !== building_ids.length) {
            throw new common_1.BadRequestException('Invalid building ids');
        }
        const hashedPassword = await argon2.hash('123456');
        const newUser = this.userRepository.create({
            email,
            username,
            company_id,
            password: hashedPassword,
        });
        const savedUser = await this.userRepository.save(newUser);
        await this.addUserToBuildings(savedUser.id, building_ids);
        return 'User created';
    }
    async addUserToBuildings(userId, buildingIds) {
        const userBuildings = buildingIds.map((buildingId) => {
            return {
                user_id: userId,
                building_id: buildingId,
            };
        });
        await this.userBuildingRepository.save(userBuildings);
    }
    async getMe(userId) {
        const user = await this.userRepository.findOne(userId);
        const company = await this.companyRepository.findOne(user.company_id);
        const buildings = await this.buildingRepository
            .createQueryBuilder('b')
            .innerJoin(user_building_entity_1.UserBuilding, 'ub', 'ub.building_id = b.id')
            .select('b.name, b.address, b.thumbnail, ub.building_id')
            .where('ub.user_id = :userId', { userId })
            .getRawMany();
        const modifiedUser = Object.assign(Object.assign({}, user), { password: undefined, company_id: undefined, company });
        return { user: modifiedUser, buildings };
    }
    async getAllUsers(page, size) {
        const count = await this.userRepository.count();
        const maxPage = Math.ceil(count / size);
        const hasNext = page < maxPage;
        const users = await this.userRepository.find({
            skip: (page - 1) * size,
            take: size,
            select: ['email', 'status', 'username', 'company_id', 'role'],
        });
        return {
            users,
            hasNext,
            page,
            maxPage,
        };
    }
    async getAllUserTest() {
        return this.userRepository.find();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(user_building_repository_1.UserBuildingRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(building_repository_1.BuildingRepository)),
    __param(3, (0, typeorm_1.InjectRepository)(company_repository_1.CompanyRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        user_building_repository_1.UserBuildingRepository,
        building_repository_1.BuildingRepository,
        company_repository_1.CompanyRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map