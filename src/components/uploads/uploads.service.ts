import { S3Service } from './s3.service';
import { FileDataRepository } from './repositories/file-data.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(FileDataRepository)
    private readonly fileDataRepository: FileDataRepository,
    private readonly s3Service: S3Service,
  ) {}
  async uploadFile(file: Express.Multer.File) {
    const url = await this.s3Service.uploadFile(
      file.buffer,
      file.mimetype,
      file.originalname,
    );
    const newFile = this.fileDataRepository.create({
      name: file.originalname,
      url,
    });
    await this.fileDataRepository.save(newFile);
    return { url, fileName: file.originalname };
  }
}
