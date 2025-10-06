import { CartEntity } from 'src/Cart/Cart.entity';
import { CategoryEntity } from 'src/Category/Category.entity';
import { OrderEntity } from 'src/Order/Order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { DiscountEntity } from './Discount/Discount.entity';
import { CollectionEntity } from 'src/Collection/Collection.entity';
import { OrderProductMapperEntity } from 'src/Mapper/Order Product Mapper/OrderProductMapper.entity';
import { ReviewRatingEntity } from 'src/Review And Rating/ReviewRating.entity';
import { WishListEntity } from 'src/wishlist/wishlist.entity';

@Entity('Product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'name', type: 'varchar', length: 150 })
  name: string;

  @Column({
    name: 'desc',
    type: 'varchar',
    length: 1500,
    default: 'No description available',
  })
  desc: string;

  @Column({ name: 'price', type: 'decimal' })
  price: number;

  @Column({ name: 'quantity', type: 'integer' }) // Assuming phone should be stored as a string due to potential leading zeros and formatting
  quantity: number;

  @Column({ name: 'image', type: 'varchar', length: 1500 })
  image: string;

  @Column({ name: 'Status', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'date', type: 'timestamp' })
  date: Date;
  @Column({ name: 'json_atribute', type: 'json' })
  json_attribute: JsonAttribute;
  @ManyToMany(() => CartEntity, (cart) => cart.products)
  carts: CartEntity[];
  
  @ManyToMany(() => OrderEntity, (order) => order.products)
  orders: OrderEntity[];
  @ManyToOne(() => CategoryEntity, (category) => category.product)
  category: CategoryEntity;

  @ManyToMany(() => CollectionEntity, (collection) => collection.products)
  collections: CollectionEntity[];
  @OneToMany(() => ReviewRatingEntity, (ReviewRating) => ReviewRating.product)
  ReviewRating: ReviewRatingEntity[];
  @OneToMany(() => WishListEntity, (wishlist) => wishlist.product)
  wishlist: WishListEntity[];
  @ManyToOne(() => DiscountEntity, (discount) => discount.products, {
    nullable: true,
  })
  @JoinColumn()
  discount: DiscountEntity;
  @OneToMany(() => OrderProductMapperEntity, (mapper) => mapper.product, {
    cascade: true,
  })
  orderProductMappers: OrderProductMapperEntity[];

  // @OneToOne(() => DiscountEntity, (discount) => discount.products, { nullable: true })
  // discount: DiscountEntity;
}
type JsonAttribute = {
  attributes: {
    [key: string]: {
      [subKey: string]: number; // Sub-attributes should have numeric values
    };
  };
};
