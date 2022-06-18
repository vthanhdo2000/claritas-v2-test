import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/common/constants/user-role.enum';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<string>;
    login(request: any, body: LoginDto): Promise<{
        token: string;
        user: {
            password: any;
            email: string;
            status: import("./constants/user-status.enum").UserStatus;
            username: string;
            company_id: number;
            role: Role;
            id: number;
            created_at: Date;
            updated_at: Date;
        };
    }>;
    getMe(request: any): Promise<{
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
    registerAdmin(dto: CreateUserByAdminDto): Promise<string>;
    getAllUsers(page: number, size: number): Promise<{
        users: User[];
        hasNext: boolean;
        page: number;
        maxPage: number;
    }>;
    getAlllUserTest(): Promise<User[]>;
}
