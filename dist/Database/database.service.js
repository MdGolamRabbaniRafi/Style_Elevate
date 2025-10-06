"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let DatabaseService = class DatabaseService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async clearDatabase() {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        console.log('cleaning...');
        try {
            await queryRunner.startTransaction();
            await queryRunner.query(`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`);
            await queryRunner.query(`TRUNCATE TABLE "Collection" RESTART IDENTITY CASCADE`);
            await queryRunner.query(`TRUNCATE TABLE "wishlist" RESTART IDENTITY CASCADE`);
            await queryRunner.query(`TRUNCATE TABLE "Order_Product" RESTART IDENTITY CASCADE`);
            await queryRunner.query(`TRUNCATE TABLE "Payment" RESTART IDENTITY CASCADE`);
            await queryRunner.query(`TRUNCATE TABLE "Banner" RESTART IDENTITY CASCADE`);
            await queryRunner.query(`TRUNCATE TABLE "ReviewRating" RESTART IDENTITY CASCADE`);
            await queryRunner.query(`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE`);
            await queryRunner.query(`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`);
            await queryRunner.query(`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`);
            await queryRunner.query(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`);
            await queryRunner.query(`TRUNCATE TABLE "offer" RESTART IDENTITY CASCADE`);
            await queryRunner.commitTransaction();
            return { message: '✅ Database cleared successfully!' };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], DatabaseService);
//# sourceMappingURL=database.service.js.map