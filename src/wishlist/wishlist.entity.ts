import { ProductEntity } from "../Product/Product.entity";
import { UserEntity } from "../User/User.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity("wishlist")
export class WishListEntity{

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({ name: 'date', type: "timestamp" })
    date: Date;

    @ManyToOne(() => ProductEntity, product => product.wishlist)
    product: ProductEntity;

    @ManyToOne(() => UserEntity, user => user.wishlist)
    user: UserEntity;

}