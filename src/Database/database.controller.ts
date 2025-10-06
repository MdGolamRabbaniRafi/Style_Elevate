// database.controller.ts
import { Controller, Post } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post('clear')
  async clearDatabase() {
    return this.databaseService.clearDatabase();
  }
}
