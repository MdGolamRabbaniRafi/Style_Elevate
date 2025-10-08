import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceEntity } from './Balance.entity';
import { BalanceService } from './Balance.service';
import { BalanceController } from './Balance.controller';
import { RootUserEntity } from 'src/Root-User/root-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BalanceEntity, RootUserEntity])],
  controllers: [BalanceController],
  providers: [BalanceService, TypeOrmModule],
})
export class BalanceModule {}
