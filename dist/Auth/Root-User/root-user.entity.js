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
exports.RootUserEntity = void 0;
const typeorm_1 = require("typeorm");
let RootUserEntity = class RootUserEntity {
};
exports.RootUserEntity = RootUserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RootUserEntity.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], RootUserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 150, unique: true }),
    __metadata("design:type", String)
], RootUserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address', type: 'varchar', length: 150, nullable: true }),
    __metadata("design:type", String)
], RootUserEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, nullable: true }),
    __metadata("design:type", String)
], RootUserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], RootUserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registration_date', type: 'timestamp' }),
    __metadata("design:type", Date)
], RootUserEntity.prototype, "registration_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role', type: 'varchar' }),
    __metadata("design:type", String)
], RootUserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'User Image', type: 'varchar' }),
    __metadata("design:type", String)
], RootUserEntity.prototype, "Image", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Status', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], RootUserEntity.prototype, "isActive", void 0);
exports.RootUserEntity = RootUserEntity = __decorate([
    (0, typeorm_1.Entity)('RootUser')
], RootUserEntity);
//# sourceMappingURL=root-user.entity.js.map