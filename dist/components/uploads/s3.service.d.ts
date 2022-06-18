/// <reference types="node" />
export declare class S3Service {
    private s3;
    constructor();
    uploadFile(dataBuffer: Buffer, mime_type: string, originalName: string): Promise<string>;
}
