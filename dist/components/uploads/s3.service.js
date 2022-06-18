"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const config_1 = require("../../config/config");
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
let S3Service = class S3Service {
    constructor() {
        this.s3 = new aws_sdk_1.S3({
            secretAccessKey: config_1.awsSetting.secretAccessKey,
            accessKeyId: config_1.awsSetting.accessKeyId,
            region: config_1.awsSetting.region,
        });
    }
    async uploadFile(dataBuffer, mime_type, originalName) {
        const params = {
            Bucket: config_1.awsSetting.bucketName,
            Key: `${Date.now()}-${originalName}`,
            Body: dataBuffer,
            ACL: 'public-read',
            ContentType: mime_type,
        };
        const result = await this.s3.upload(params).promise();
        return result.Location;
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map