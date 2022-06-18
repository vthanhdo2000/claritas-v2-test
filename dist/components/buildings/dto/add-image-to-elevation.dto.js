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
exports.AddImageToElevationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AddImageToElevationDto {
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AddImageToElevationDto.prototype, "elevation_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AddImageToElevationDto.prototype, "building_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], AddImageToElevationDto.prototype, "rows", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], AddImageToElevationDto.prototype, "columns", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, swagger_1.ApiProperty)({ type: [Object] }),
    __metadata("design:type", Array)
], AddImageToElevationDto.prototype, "images", void 0);
exports.AddImageToElevationDto = AddImageToElevationDto;
//# sourceMappingURL=add-image-to-elevation.dto.js.map