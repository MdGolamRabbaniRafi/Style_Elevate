import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './Cart/Cart.module';
import { CategoryModule } from './Category/Category.module';
import { OrderModule } from './Order/Order.module';
import { ProductModule } from './Product/Product.module';
import { UserModule } from './User/User.module';
// import { OrderHistoryMapperModule } from './Mapper/Order History Mapper/OHM.module';
// import { ProductOrderMapperModule } from './Mapper/ProductOrderMapper/ProductOrderMapper.module';
import { CollectionModule } from './Collection/Collection.module';
import { PaymentModule } from './Payment/Payment.module';
import { DiscountModule } from './Product/Discount/Discount.module';
// import { ProductCollectionMapperModule } from './Mapper/Product Collection Mapper/PCM.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './Auth/Auth.module';
import { BannerModule } from './Banner/Banner.module';
import { ReviewRatingModule } from './Review And Rating/ReviewRating.module';
import { WishListModule } from './wishlist/WishList.module';
//import { RedisModule } from './Auth/Redis/redis.module';
import { EmailOTPModule } from './EmailOTP/EmailOTP.module';
// import { ChatModule } from './Real Time Chat/chat.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TokenModule } from './Auth/token/Token.module';
import { BalanceModule } from './Balance/balance.module';
import { CuponModule } from './Cupon/Cupon.module';
import { DatabaseModule } from './Database/database.module';
import { GraphModule } from './graph/Graph.module';
import { OfferModule } from './Offer/Offer.Module';
import { PathaoModule } from './pathao/Pathao.module';
import { RootUserModule } from './Root-User/root-user.module';
import { SeedModule } from './Seed/seed.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),

    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UserModule,
    ProductModule,
    CartModule,
    OrderModule,
    AuthModule,
    CategoryModule, //OrderHistoryMapperModule, //ProductOrderMapperModule,
    PaymentModule,
    DiscountModule,
    CollectionModule,
    // ProductCollectionMapperModule,
    BannerModule,
    // RedisModule,
    ReviewRatingModule,
    WishListModule,
    TokenModule,
    EmailOTPModule, //ChatModule,
    GraphModule,
    CuponModule,
    PathaoModule,
    OfferModule,
    SeedModule,
    DatabaseModule,
    RootUserModule,
    BalanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
