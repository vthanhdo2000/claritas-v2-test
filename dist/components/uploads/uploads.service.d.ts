/// <reference types="multer" />
import { S3Service } from './s3.service';
import { FileDataRepository } from './repositories/file-data.repository';
export declare class UploadsService {
    private readonly fileDataRepository;
    private readonly s3Service;
    constructor(fileDataRepository: FileDataRepository, s3Service: S3Service);
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
        fileName: string;
    }>;
}
