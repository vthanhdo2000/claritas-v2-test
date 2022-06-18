import { awsSetting } from '../../config/config';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      secretAccessKey: awsSetting.secretAccessKey,
      accessKeyId: awsSetting.accessKeyId,
      region: awsSetting.region,
    });
  }

  async uploadFile(
    dataBuffer: Buffer,
    mime_type: string,
    originalName: string,
  ) {
    const params = {
      Bucket: awsSetting.bucketName,
      Key: `${Date.now()}-${originalName}`,
      Body: dataBuffer,
      ACL: 'public-read',
      ContentType: mime_type,
    };
    const result = await this.s3.upload(params).promise();

    return result.Location;
  }
}
