import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/User/User.entity';
import { UserService } from 'src/User/User.service';
import { EmailOTPService } from 'src/EmailOTP/EmailOTP.service';
import { TokenService } from './token/token.service';
import { RootUserEntity } from './Root-User/root-user.entity';
import { RootUserService } from './Root-User/root-user.service';
export declare class AuthService {
    private readonly userService;
    private readonly rootUserService;
    private jwtService;
    private readonly otpService;
    private readonly tokenService;
    constructor(userService: UserService, rootUserService: RootUserService, jwtService: JwtService, otpService: EmailOTPService, tokenService: TokenService);
    validateUser(username: string, password: string): Promise<UserEntity | RootUserEntity>;
    login(user: UserEntity | RootUserEntity): Promise<{
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
    validateRefreshToken(token: string): Promise<any>;
    RefreshToken(refreshToken: string, req: any): Promise<{
        accessToken: string;
    }>;
    SignUpOTPCheck(userEntity: UserEntity): Promise<any>;
    Signup(email: string, otp: string): Promise<any>;
    logout(token: string): Promise<void>;
    GoogleAuth(logindata: any): Promise<{
        accessToken: string;
    } | any>;
    generateRandomPassword(length?: number): Promise<string>;
}
