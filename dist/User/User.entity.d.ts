import { CartEntity } from '../Cart/Cart.entity';
import { ReviewRatingEntity } from '../Review And Rating/ReviewRating.entity';
import { WishListEntity } from 'src/wishlist/wishlist.entity';
export declare class UserEntity {
    Id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    registration_date: Date;
    role: string;
    Image: string;
    isActive: boolean;
    cart: CartEntity[];
    order: CartEntity[];
    ReviewRating: ReviewRatingEntity[];
    wishlist: WishListEntity[];
    payment: WishListEntity[];
}
