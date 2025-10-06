import { UserEntity } from '../User/User.entity';
import { AuthService } from './Auth.service';
import { RootUserEntity } from './Root-User/root-user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(userEntity: UserEntity | RootUserEntity, req: any): Promise<{
        accessToken: string;
        refreshToken: string;
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
        cart: import("../Cart/Cart.entity").CartEntity[];
        order: import("../Cart/Cart.entity").CartEntity[];
        ReviewRating: import("../Review And Rating/ReviewRating.entity").ReviewRatingEntity[];
        wishlist: import("../wishlist/wishlist.entity").WishListEntity[];
        payment: import("../wishlist/wishlist.entity").WishListEntity[];
    } | {
        accessToken: string;
        refreshToken: string;
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
    }>;
    SignUp(userEntity: UserEntity, myfile: Express.Multer.File): Promise<any>;
    checkOtp(email: string, otp: string): Promise<any>;
    RefreshToken(refreshToken: string, req: any): Promise<{
        accessToken: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
    GoogleAuth(logindata: any, myfile: Express.Multer.File): Promise<any>;
}
