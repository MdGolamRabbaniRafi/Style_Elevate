import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BalanceEntity } from './Balance.entity';
import { BalanceService } from './Balance.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Balance')
@Controller('Balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  getHello(): string {
    return this.balanceService.getHello();
  }
  @Get('/search/:id')
  async SearchByID(@Param('id', ParseIntPipe) Id: number): Promise<any> {
    return await this.balanceService.findById(Id);
  }
  @Get('/search')
  async Search(): Promise<any> {
    return await this.balanceService.findAll();
  }

  @Post('/add')
  async addBalance(
    @Body() BalanceData: BalanceEntity,
  ): Promise<BalanceEntity | { message: string }> {
    return await this.balanceService.addBalance(BalanceData); //Balance/addBalance
  }

  @Put(':id/add-approval')
  async addApproval(
    @Param('id') balanceId: number,
    @Body('rootUserId') rootUserId: number,
  ) {
    return this.balanceService.addApproval(balanceId, rootUserId);
  }
  @Put('/edit/:id')
  async editBalance(
    @Param('id', ParseIntPipe) Id: number,
    @Body() BalanceData: Partial<BalanceEntity>,
  ): Promise<{ message: string }> {
    return await this.balanceService.editBalance(Id, BalanceData);
  }
  @Delete('/delete/:id')
  async deleteBalance(
    @Param('id', ParseIntPipe) Id: number,
  ): Promise<{ message: string }> {
    return await this.balanceService.deleteBalance(Id);
  }
}
