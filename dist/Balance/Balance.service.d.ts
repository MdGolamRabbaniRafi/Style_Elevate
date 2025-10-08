import { Repository } from 'typeorm';
import { BalanceEntity } from './Balance.entity';
import { RootUserEntity } from 'src/Root-User/root-user.entity';
export declare class BalanceService {
    private balanceRepo;
    private rootUserRepo;
    constructor(balanceRepo: Repository<BalanceEntity>, rootUserRepo: Repository<RootUserEntity>);
    getHello(): string;
    findById(id: number): Promise<BalanceEntity | {
        message: string;
    }>;
    findAll(): Promise<any[]>;
    addBalance(balanceEntity: BalanceEntity): Promise<BalanceEntity | {
        message: string;
    }>;
    addApproval(balanceId: number, rootUserId: number): Promise<BalanceEntity | {
        message: string;
    }>;
    editBalance(id: number, BalanceData: Partial<BalanceEntity>): Promise<{
        message: string;
    }>;
    deleteBalance(id: number): Promise<{
        message: string;
    }>;
}
