import { S3Service } from './s3.service';
import { FileDataRepository } from './repositories/file-data.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, S3Service],
  imports: [TypeOrmModule.forFeature([FileDataRepository])],
  exports: [S3Service],
})
export class UploadsModule {}
