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
exports.WishListEntity = void 0;
const Product_entity_1 = require("../Product/Product.entity");
const User_entity_1 = require("../User/User.entity");
const typeorm_1 = require("typeorm");
let WishListEntity = class WishListEntity {
};
exports.WishListEntity = WishListEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WishListEntity.prototype, "Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date', type: "timestamp" }),
    __metadata("design:type", Date)
], WishListEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_entity_1.ProductEntity, product => product.wishlist),
    __metadata("design:type", Product_entity_1.ProductEntity)
], WishListEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.UserEntity, user => user.wishlist),
    __metadata("design:type", User_entity_1.UserEntity)
], WishListEntity.prototype, "user", void 0);
exports.WishListEntity = WishListEntity = __decorate([
    (0, typeorm_1.Entity)("wishlist")
], WishListEntity);
//# sourceMappingURL=wishlist.entity.js.map