import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { UserEntity } from '../User/User.entity';
import { CategoryEntity } from '../Category/Category.entity';
import { ProductEntity } from '../Product/Product.entity';
import { SeedController } from './seed.controller';
import { OrderProductMapperEntity } from '../Mapper/Order Product Mapper/OrderProductMapper.entity';
import { OrderEntity } from '../Order/Order.entity';
import { ReviewRatingEntity } from '../Review And Rating/ReviewRating.entity';
import { BannerEntity } from '../Banner/Banner.entity';
import { WishListEntity } from 'src/wishlist/wishlist.entity';
import { OfferEntity } from 'src/Offer/Offer.entity';
import { PaymentEntity } from 'src/Payment/Payment.entity';
import { CartEntity } from 'src/Cart/Cart.entity';
import { RootUserEntity } from 'src/Root-User/root-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      CategoryEntity,
      ProductEntity,
      OrderProductMapperEntity,
      OrderEntity,
      ReviewRatingEntity,
      BannerEntity,
      WishListEntity,
      OfferEntity,
      PaymentEntity,
      CartEntity,
      RootUserEntity,
    ]),
  ],
  providers: [SeedService],
  controllers: [SeedController], // for API usage
  exports: [SeedService], // for CLI usage
})
export class SeedModule {}
