import { BalanceEntity } from 'src/Balance/balance.entity';
import { BaseEntity } from 'src/Common/base.entity';
export declare class RootUserEntity extends BaseEntity {
    name: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    registration_date: Date;
    role: string;
    Image: string;
    netBalance: number;
    isActive: boolean;
    balance: BalanceEntity[];
}
