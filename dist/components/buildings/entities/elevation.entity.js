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
exports.Elevation = void 0;
const elevation_status_enum_1 = require("./../constants/elevation-status.enum");
const base_entity_1 = require("../../../common/entites/base.entity");
const typeorm_1 = require("typeorm");
let Elevation = class Elevation extends base_entity_1.Base {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, default: null }),
    __metadata("design:type", String)
], Elevation.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int4', nullable: true, default: null }),
    __metadata("design:type", Number)
], Elevation.prototype, "building_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Elevation.prototype, "direction", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int4', nullable: true, default: null }),
    __metadata("design:type", Number)
], Elevation.prototype, "rows", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int4', nullable: true, default: null }),
    __metadata("design:type", Number)
], Elevation.prototype, "columns", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: elevation_status_enum_1.ElevationStatus,
        default: elevation_status_enum_1.ElevationStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Elevation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', default: null, nullable: true }),
    __metadata("design:type", Array)
], Elevation.prototype, "images", void 0);
Elevation = __decorate([
    (0, typeorm_1.Entity)({ name: 'elevations' })
], Elevation);
exports.Elevation = Elevation;
//# sourceMappingURL=elevation.entity.js.map