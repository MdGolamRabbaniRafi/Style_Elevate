import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGaurd } from '../Auth/Role/Roles.gaurd';
import { RootUserController } from './root-user.controller';
import { RootUserEntity } from './root-user.entity';
import { RootUserService } from './root-user.service';
import { BalanceEntity } from 'src/Balance/balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RootUserEntity, BalanceEntity])],
  controllers: [RootUserController],
  providers: [RootUserService, RolesGaurd],
  exports: [RootUserService, TypeOrmModule], // Export RootUserService and TypeOrmModule
})
export class RootUserModule {}
