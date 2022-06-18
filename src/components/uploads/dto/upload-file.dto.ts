import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    description: 'File or image',
    type: 'file',
  })
  file: any;
}
