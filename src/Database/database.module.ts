// database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/User/User.entity';
import { ProductEntity } from 'src/Product/Product.entity';
import { CategoryEntity } from 'src/Category/Category.entity';
import { OrderEntity } from 'src/Order/Order.entity';
import { OrderProductMapperEntity } from 'src/Mapper/Order Product Mapper/OrderProductMapper.entity';
import { BannerEntity } from 'src/Banner/Banner.entity';
import { WishListEntity } from '../wishlist/wishlist.entity';
import { OfferEntity } from 'src/Offer/Offer.entity';
import { PaymentEntity } from 'src/Payment/Payment.entity';
import { ReviewRatingEntity } from 'src/Review And Rating/ReviewRating.entity';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ProductEntity,
      CategoryEntity,
      OrderEntity,
      OrderProductMapperEntity,
      BannerEntity,
      ReviewRatingEntity,
      WishListEntity,
      OfferEntity,
      PaymentEntity,
    ]),
  ],
  providers: [DatabaseService],
  controllers: [DatabaseController],
  exports: [DatabaseService],
})
export class DatabaseModule {}
