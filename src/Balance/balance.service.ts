import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BalanceEntity } from './Balance.entity';
import { RootUserEntity } from 'src/Root-User/root-user.entity';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(BalanceEntity)
    private balanceRepo: Repository<BalanceEntity>,

    @InjectRepository(RootUserEntity)
    private rootUserRepo: Repository<RootUserEntity>,
  ) {}
  getHello(): string {
    return 'Hello Order!';
  }
  async findById(id: number): Promise<BalanceEntity | { message: string }> {
    let BalanceEntity = await this.balanceRepo.findOne({ where: { Id: id } });
    if (BalanceEntity != null) {
      return BalanceEntity;
    }
    return { message: 'Not found' };
  }
  async findAll(): Promise<any[]> {
    let BalanceEntities = await this.balanceRepo.find();
    if (BalanceEntities.length > 0) {
      return BalanceEntities;
    }
    return [];
  }

  async addBalance(
    balanceEntity: BalanceEntity,
  ): Promise<BalanceEntity | { message: string }> {
    if (!balanceEntity.root?.Id) {
      return { message: 'Root user id is required' };
    }

    balanceEntity.approval = [balanceEntity.root.Id];

    const saved = await this.balanceRepo.save(balanceEntity);
    return saved || { message: 'Balance not added' };
  }

  async addApproval(
    balanceId: number,
    rootUserId: number,
  ): Promise<BalanceEntity | { message: string }> {
    // Find the balance
    const balance = await this.balanceRepo.findOne({
      where: { Id: balanceId },
      relations: ['root'],
    });

    if (!balance) {
      return { message: 'Balance not found' };
    }

    const rootUser = await this.rootUserRepo.findOne({
      where: { Id: rootUserId },
    });

    if (!rootUser) {
      return { message: 'Root user not found' };
    }

    // Initialize approval array if undefined
    if (!balance.approval) balance.approval = [];

    // Check if the root user ID is already in approval
    if (balance.approval.includes(rootUserId)) {
      return { message: 'Root user is already approved' };
    }

    // Add root user ID to approval array
    balance.approval.push(rootUserId);
    const countApproval = balance.approval.length;
    const totalRootUser = await this.rootUserRepo.count();
    if (countApproval === totalRootUser) {
      balance.isApproved = true;

      // Corrected: use 'where' with proper column name
      const rootUser = await this.rootUserRepo.findOne({
        where: { Id: balance.root.Id },
      });

      if (rootUser) {
        const currentBalance = Number(balance.root.netBalance) || 0;
        const amount = Number(balance.amount) || 0;

        balance.root.netBalance = currentBalance + amount;
        await this.rootUserRepo.save(rootUser);
      }

      const updated = await this.balanceRepo.save(balance);
      return updated;
    }

    // Save updated balance
    const updated = await this.balanceRepo.save(balance);

    return updated;
  }

  async editBalance(
    id: number,
    BalanceData: Partial<BalanceEntity>,
  ): Promise<{ message: string }> {
    const existingBalance = await this.balanceRepo.findOne({
      where: { Id: id },
    });

    if (!existingBalance) {
      return { message: 'Balance not found' }; // Balance not found
    }

    await this.balanceRepo.update(id, BalanceData);
    return { message: 'Balance updated successfully' }; // Balance not found
  }
  async deleteBalance(id: number): Promise<{ message: string }> {
    const existingBalance = await this.balanceRepo.findOne({
      where: { Id: id },
    });

    if (!existingBalance) {
      return { message: 'Balance not found' }; // Balance not found
    }

    await this.balanceRepo.delete(id);
    return { message: 'Balance deleted successfully' }; // Balance not found
  }
}
