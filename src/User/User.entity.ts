import { CartEntity } from '../Cart/Cart.entity';
import { PaymentEntity } from '../Payment/Payment.entity';
import { ReviewRatingEntity } from '../Review And Rating/ReviewRating.entity';
import { WishListEntity } from 'src/wishlist/wishlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ name: 'name', type: 'varchar', length: 150 })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ name: 'address', type: 'varchar', length: 150, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  phone: string;

  @Column({ name: 'password', type: 'varchar', length: 150 })
  password: string;

  @Column({ name: 'registration_date', type: 'timestamp' })
  registration_date: Date;

  @Column({ name: 'role', type: 'varchar' })
  role: string;

  @Column({ name: 'User Image', type: 'varchar' })
  Image: string;

  @Column({ name: 'Status', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => CartEntity, (cart) => cart.user)
  cart: CartEntity[];

  @OneToMany(() => CartEntity, (order) => order.user)
  order: CartEntity[];

  @OneToMany(() => ReviewRatingEntity, (ReviewRating) => ReviewRating.user)
  ReviewRating: ReviewRatingEntity[];

  @OneToMany(() => WishListEntity, (wishlist) => wishlist.user)
  wishlist: WishListEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.user)
  payment: WishListEntity[];
}
