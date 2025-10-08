import { BalanceEntity } from './Balance.entity';
import { BalanceService } from './Balance.service';
export declare class BalanceController {
    private readonly balanceService;
    constructor(balanceService: BalanceService);
    getHello(): string;
    SearchByID(Id: number): Promise<any>;
    Search(): Promise<any>;
    addBalance(BalanceData: BalanceEntity): Promise<BalanceEntity | {
        message: string;
    }>;
    addApproval(balanceId: number, rootUserId: number): Promise<BalanceEntity | {
        message: string;
    }>;
    editBalance(Id: number, BalanceData: Partial<BalanceEntity>): Promise<{
        message: string;
    }>;
    deleteBalance(Id: number): Promise<{
        message: string;
    }>;
}
