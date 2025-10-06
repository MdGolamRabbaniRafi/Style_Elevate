"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_entity_1 = require("../User/User.entity");
const Product_entity_1 = require("../Product/Product.entity");
const Category_entity_1 = require("../Category/Category.entity");
const Order_entity_1 = require("../Order/Order.entity");
const OrderProductMapper_entity_1 = require("../Mapper/Order Product Mapper/OrderProductMapper.entity");
const Banner_entity_1 = require("../Banner/Banner.entity");
const wishlist_entity_1 = require("../wishlist/wishlist.entity");
const Offer_entity_1 = require("../Offer/Offer.entity");
const Payment_entity_1 = require("../Payment/Payment.entity");
const ReviewRating_entity_1 = require("../Review And Rating/ReviewRating.entity");
const database_service_1 = require("./database.service");
const database_controller_1 = require("./database.controller");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                User_entity_1.UserEntity,
                Product_entity_1.ProductEntity,
                Category_entity_1.CategoryEntity,
                Order_entity_1.OrderEntity,
                OrderProductMapper_entity_1.OrderProductMapperEntity,
                Banner_entity_1.BannerEntity,
                ReviewRating_entity_1.ReviewRatingEntity,
                wishlist_entity_1.WishListEntity,
                Offer_entity_1.OfferEntity,
                Payment_entity_1.PaymentEntity,
            ]),
        ],
        providers: [database_service_1.DatabaseService],
        controllers: [database_controller_1.DatabaseController],
        exports: [database_service_1.DatabaseService],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map