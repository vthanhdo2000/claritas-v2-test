import { UserStatus } from './../constants/user-status.enum';
import { Role } from '../../../common/constants/user-role.enum';
import { Base } from 'src/common/entites/base.entity';
export declare class User extends Base {
    email: string;
    password: string;
    status: UserStatus;
    username: string;
    company_id: number;
    role: Role;
}
