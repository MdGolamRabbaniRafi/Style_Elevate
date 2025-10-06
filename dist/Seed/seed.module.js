"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const seed_service_1 = require("./seed.service");
const User_entity_1 = require("../User/User.entity");
const Category_entity_1 = require("../Category/Category.entity");
const Product_entity_1 = require("../Product/Product.entity");
const seed_controller_1 = require("./seed.controller");
const OrderProductMapper_entity_1 = require("../Mapper/Order Product Mapper/OrderProductMapper.entity");
const Order_entity_1 = require("../Order/Order.entity");
const ReviewRating_entity_1 = require("../Review And Rating/ReviewRating.entity");
const Banner_entity_1 = require("../Banner/Banner.entity");
const wishlist_entity_1 = require("../wishlist/wishlist.entity");
const Offer_entity_1 = require("../Offer/Offer.entity");
const Payment_entity_1 = require("../Payment/Payment.entity");
const Cart_entity_1 = require("../Cart/Cart.entity");
const root_user_entity_1 = require("../Auth/Root-User/root-user.entity");
let SeedModule = class SeedModule {
};
exports.SeedModule = SeedModule;
exports.SeedModule = SeedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                User_entity_1.UserEntity,
                Category_entity_1.CategoryEntity,
                Product_entity_1.ProductEntity,
                OrderProductMapper_entity_1.OrderProductMapperEntity,
                Order_entity_1.OrderEntity,
                ReviewRating_entity_1.ReviewRatingEntity,
                Banner_entity_1.BannerEntity,
                wishlist_entity_1.WishListEntity,
                Offer_entity_1.OfferEntity,
                Payment_entity_1.PaymentEntity,
                Cart_entity_1.CartEntity,
                root_user_entity_1.RootUserEntity,
            ]),
        ],
        providers: [seed_service_1.SeedService],
        controllers: [seed_controller_1.SeedController],
        exports: [seed_service_1.SeedService],
    })
], SeedModule);
//# sourceMappingURL=seed.module.js.map