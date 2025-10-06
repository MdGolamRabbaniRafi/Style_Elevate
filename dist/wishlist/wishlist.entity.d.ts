import { ProductEntity } from "../Product/Product.entity";
import { UserEntity } from "../User/User.entity";
export declare class WishListEntity {
    Id: number;
    date: Date;
    product: ProductEntity;
    user: UserEntity;
}
