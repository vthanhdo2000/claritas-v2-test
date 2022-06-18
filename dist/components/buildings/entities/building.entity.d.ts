import { BuildingStatus } from './../constants/building-status.enum';
import { Base } from 'src/common/entites/base.entity';
export declare class Building extends Base {
    name: string;
    address: string;
    thumbnail: string;
    company_id: number;
    status: BuildingStatus;
}
