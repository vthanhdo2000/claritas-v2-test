interface ImageWithOrderInterface {
    order: number;
    url: string;
}
export declare class AddImageToElevationDto {
    elevation_id: number;
    building_id: number;
    rows?: number;
    columns?: number;
    images: ImageWithOrderInterface[];
}
export {};
