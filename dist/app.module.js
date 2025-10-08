"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const Cart_module_1 = require("./Cart/Cart.module");
const Category_module_1 = require("./Category/Category.module");
const Order_module_1 = require("./Order/Order.module");
const Product_module_1 = require("./Product/Product.module");
const User_module_1 = require("./User/User.module");
const Collection_module_1 = require("./Collection/Collection.module");
const Payment_module_1 = require("./Payment/Payment.module");
const Discount_module_1 = require("./Product/Discount/Discount.module");
const config_1 = require("@nestjs/config");
const Auth_module_1 = require("./Auth/Auth.module");
const Banner_module_1 = require("./Banner/Banner.module");
const ReviewRating_module_1 = require("./Review And Rating/ReviewRating.module");
const WishList_module_1 = require("./wishlist/WishList.module");
const EmailOTP_module_1 = require("./EmailOTP/EmailOTP.module");
const schedule_1 = require("@nestjs/schedule");
const Token_module_1 = require("./Auth/token/Token.module");
const balance_module_1 = require("./Balance/balance.module");
const Cupon_module_1 = require("./Cupon/Cupon.module");
const database_module_1 = require("./Database/database.module");
const Graph_module_1 = require("./graph/Graph.module");
const Offer_Module_1 = require("./Offer/Offer.Module");
const Pathao_module_1 = require("./pathao/Pathao.module");
const root_user_module_1 = require("./Root-User/root-user.module");
const seed_module_1 = require("./Seed/seed.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DATABASE_HOST'),
                    port: configService.get('DATABASE_PORT'),
                    username: configService.get('DATABASE_USER'),
                    password: configService.get('DATABASE_PASSWORD'),
                    database: configService.get('DATABASE_NAME'),
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            User_module_1.UserModule,
            Product_module_1.ProductModule,
            Cart_module_1.CartModule,
            Order_module_1.OrderModule,
            Auth_module_1.AuthModule,
            Category_module_1.CategoryModule,
            Payment_module_1.PaymentModule,
            Discount_module_1.DiscountModule,
            Collection_module_1.CollectionModule,
            Banner_module_1.BannerModule,
            ReviewRating_module_1.ReviewRatingModule,
            WishList_module_1.WishListModule,
            Token_module_1.TokenModule,
            EmailOTP_module_1.EmailOTPModule,
            Graph_module_1.GraphModule,
            Cupon_module_1.CuponModule,
            Pathao_module_1.PathaoModule,
            Offer_Module_1.OfferModule,
            seed_module_1.SeedModule,
            database_module_1.DatabaseModule,
            root_user_module_1.RootUserModule,
            balance_module_1.BalanceModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map