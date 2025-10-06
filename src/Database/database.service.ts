// database.service.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private readonly dataSource: DataSource) {}

  async clearDatabase() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    console.log('cleaning...');

    try {
      await queryRunner.startTransaction();

      await queryRunner.query(`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`);
      await queryRunner.query(
        `TRUNCATE TABLE "Collection" RESTART IDENTITY CASCADE`,
      );

      // Truncate join tables first
      await queryRunner.query(
        `TRUNCATE TABLE "wishlist" RESTART IDENTITY CASCADE`,
      );
      await queryRunner.query(
        `TRUNCATE TABLE "Order_Product" RESTART IDENTITY CASCADE`,
      );

      // Truncate main tables
      await queryRunner.query(
        `TRUNCATE TABLE "Payment" RESTART IDENTITY CASCADE`,
      );
      await queryRunner.query(
        `TRUNCATE TABLE "Banner" RESTART IDENTITY CASCADE`,
      );
      await queryRunner.query(
        `TRUNCATE TABLE "ReviewRating" RESTART IDENTITY CASCADE`,
      );
      await queryRunner.query(
        `TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE`,
      );
      await queryRunner.query(
        `TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`,
      );
      await queryRunner.query(
        `TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`,
      );
      await queryRunner.query(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`);
      await queryRunner.query(
        `TRUNCATE TABLE "offer" RESTART IDENTITY CASCADE`,
      );

      await queryRunner.commitTransaction();
      return { message: '✅ Database cleared successfully!' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
