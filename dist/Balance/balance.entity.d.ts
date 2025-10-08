import { RootUserEntity } from 'src/Root-User/root-user.entity';
import { BaseEntity } from 'src/Common/base.entity';
export declare class BalanceEntity extends BaseEntity {
    amount: number;
    isApproved: boolean;
    root: RootUserEntity;
    approval: number[];
}
