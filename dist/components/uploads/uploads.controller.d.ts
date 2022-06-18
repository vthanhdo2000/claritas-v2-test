/// <reference types="multer" />
import { UploadFileDto } from './dto/upload-file.dto';
import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    uploadFile(file: Express.Multer.File, dto: UploadFileDto): Promise<{
        url: string;
        fileName: string;
    }>;
}
