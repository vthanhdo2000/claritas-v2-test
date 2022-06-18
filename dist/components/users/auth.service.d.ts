import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserStatus } from './constants/user-status.enum';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User>;
    login(user: User): Promise<{
        token: string;
        user: {
            password: any;
            email: string;
            status: UserStatus;
            username: string;
            company_id: number;
            role: import("../../common/constants/user-role.enum").Role;
            id: number;
            created_at: Date;
            updated_at: Date;
        };
    }>;
}
