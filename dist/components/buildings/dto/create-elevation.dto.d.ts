interface Image {
    order: number;
    url: string;
}
export declare class CreateElevationDto {
    building_id: number;
    name: string;
    direction: number;
    rows: number;
    columns: number;
    images: Image[];
}
export {};
