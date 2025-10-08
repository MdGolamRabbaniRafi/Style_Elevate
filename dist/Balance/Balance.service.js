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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Balance_entity_1 = require("./Balance.entity");
const root_user_entity_1 = require("../Root-User/root-user.entity");
let BalanceService = class BalanceService {
    constructor(balanceRepo, rootUserRepo) {
        this.balanceRepo = balanceRepo;
        this.rootUserRepo = rootUserRepo;
    }
    getHello() {
        return 'Hello Order!';
    }
    async findById(id) {
        let BalanceEntity = await this.balanceRepo.findOne({ where: { Id: id } });
        if (BalanceEntity != null) {
            return BalanceEntity;
        }
        return { message: 'Not found' };
    }
    async findAll() {
        let BalanceEntities = await this.balanceRepo.find();
        if (BalanceEntities.length > 0) {
            return BalanceEntities;
        }
        return [];
    }
    async addBalance(balanceEntity) {
        if (!balanceEntity.root?.Id) {
            return { message: 'Root user id is required' };
        }
        balanceEntity.approval = [balanceEntity.root.Id];
        const saved = await this.balanceRepo.save(balanceEntity);
        return saved || { message: 'Balance not added' };
    }
    async addApproval(balanceId, rootUserId) {
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
        if (!balance.approval)
            balance.approval = [];
        if (balance.approval.includes(rootUserId)) {
            return { message: 'Root user is already approved' };
        }
        balance.approval.push(rootUserId);
        const countApproval = balance.approval.length;
        const totalRootUser = await this.rootUserRepo.count();
        if (countApproval === totalRootUser) {
            balance.isApproved = true;
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
        const updated = await this.balanceRepo.save(balance);
        return updated;
    }
    async editBalance(id, BalanceData) {
        const existingBalance = await this.balanceRepo.findOne({
            where: { Id: id },
        });
        if (!existingBalance) {
            return { message: 'Balance not found' };
        }
        await this.balanceRepo.update(id, BalanceData);
        return { message: 'Balance updated successfully' };
    }
    async deleteBalance(id) {
        const existingBalance = await this.balanceRepo.findOne({
            where: { Id: id },
        });
        if (!existingBalance) {
            return { message: 'Balance not found' };
        }
        await this.balanceRepo.delete(id);
        return { message: 'Balance deleted successfully' };
    }
};
exports.BalanceService = BalanceService;
exports.BalanceService = BalanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Balance_entity_1.BalanceEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(root_user_entity_1.RootUserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BalanceService);
//# sourceMappingURL=Balance.service.js.map