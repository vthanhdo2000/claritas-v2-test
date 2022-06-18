import { CompanyStatus } from './../constants/company-status.enum';
import { Base } from 'src/common/entites/base.entity';
export declare class Company extends Base {
    name: string;
    address: string;
    status: CompanyStatus;
    thumbnail: string;
}
