import { ElevationStatus } from './../constants/elevation-status.enum';
import { Base } from 'src/common/entites/base.entity';
interface Image {
    order: number;
    url: string;
}
export declare class Elevation extends Base {
    name: string;
    building_id: number;
    direction: number;
    rows: number;
    columns: number;
    status: ElevationStatus;
    images: Image[];
}
export {};
