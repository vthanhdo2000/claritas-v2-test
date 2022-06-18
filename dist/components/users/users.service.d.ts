import { CompanyRepository } from './../companies/repositories/company.repository';
import { BuildingRepository } from './../buildings/repositories/building.repository';
import { UserBuildingRepository } from './../buildings/repositories/user-building.repository';
import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/common/constants/user-role.enum';
export declare class UsersService {
    private readonly userRepository;
    private readonly userBuildingRepository;
    private readonly buildingRepository;
    private readonly companyRepository;
    constructor(userRepository: UserRepository, userBuildingRepository: UserBuildingRepository, buildingRepository: BuildingRepository, companyRepository: CompanyRepository);
    register({ password, ...info }: CreateUserDto): Promise<string>;
    registerAdmin({ company_id, email, username, building_ids, }: CreateUserByAdminDto): Promise<string>;
    addUserToBuildings(userId: number, buildingIds: number[]): Promise<void>;
    getMe(userId: number): Promise<{
        user: {
            password: any;
            company_id: any;
            company: import("../companies/entities/company.entity").Company;
            email: string;
            status: import("./constants/user-status.enum").UserStatus;
            username: string;
            role: Role;
            id: number;
            created_at: Date;
            updated_at: Date;
        };
        buildings: any[];
    }>;
    getAllUsers(page: number, size: number): Promise<{
        users: import("./entities/user.entity").User[];
        hasNext: boolean;
        page: number;
        maxPage: number;
    }>;
    getAllUserTest(): Promise<import("./entities/user.entity").User[]>;
}
