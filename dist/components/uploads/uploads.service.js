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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const s3_service_1 = require("./s3.service");
const file_data_repository_1 = require("./repositories/file-data.repository");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
let UploadsService = class UploadsService {
    constructor(fileDataRepository, s3Service) {
        this.fileDataRepository = fileDataRepository;
        this.s3Service = s3Service;
    }
    async uploadFile(file) {
        const url = await this.s3Service.uploadFile(file.buffer, file.mimetype, file.originalname);
        const newFile = this.fileDataRepository.create({
            name: file.originalname,
            url,
        });
        await this.fileDataRepository.save(newFile);
        return { url, fileName: file.originalname };
    }
};
UploadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_data_repository_1.FileDataRepository)),
    __metadata("design:paramtypes", [file_data_repository_1.FileDataRepository,
        s3_service_1.S3Service])
], UploadsService);
exports.UploadsService = UploadsService;
//# sourceMappingURL=uploads.service.js.map