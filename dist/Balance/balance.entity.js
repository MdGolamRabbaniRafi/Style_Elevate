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
exports.BalanceEntity = void 0;
const root_user_entity_1 = require("../Root-User/root-user.entity");
const base_entity_1 = require("../Common/base.entity");
const typeorm_1 = require("typeorm");
let BalanceEntity = class BalanceEntity extends base_entity_1.BaseEntity {
};
exports.BalanceEntity = BalanceEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'amount', type: 'decimal' }),
    __metadata("design:type", Number)
], BalanceEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], BalanceEntity.prototype, "isApproved", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => root_user_entity_1.RootUserEntity, (root) => root.balance, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", root_user_entity_1.RootUserEntity)
], BalanceEntity.prototype, "root", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { array: true, default: [] }),
    __metadata("design:type", Array)
], BalanceEntity.prototype, "approval", void 0);
exports.BalanceEntity = BalanceEntity = __decorate([
    (0, typeorm_1.Entity)('Balance')
], BalanceEntity);
//# sourceMappingURL=balance.entity.js.map