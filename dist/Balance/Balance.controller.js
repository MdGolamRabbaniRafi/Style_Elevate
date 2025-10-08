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
exports.BalanceController = void 0;
const common_1 = require("@nestjs/common");
const Balance_entity_1 = require("./Balance.entity");
const Balance_service_1 = require("./Balance.service");
const swagger_1 = require("@nestjs/swagger");
let BalanceController = class BalanceController {
    constructor(balanceService) {
        this.balanceService = balanceService;
    }
    getHello() {
        return this.balanceService.getHello();
    }
    async SearchByID(Id) {
        return await this.balanceService.findById(Id);
    }
    async Search() {
        return await this.balanceService.findAll();
    }
    async addBalance(BalanceData) {
        return await this.balanceService.addBalance(BalanceData);
    }
    async addApproval(balanceId, rootUserId) {
        return this.balanceService.addApproval(balanceId, rootUserId);
    }
    async editBalance(Id, BalanceData) {
        return await this.balanceService.editBalance(Id, BalanceData);
    }
    async deleteBalance(Id) {
        return await this.balanceService.deleteBalance(Id);
    }
};
exports.BalanceController = BalanceController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], BalanceController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/search/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "SearchByID", null);
__decorate([
    (0, common_1.Get)('/search'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "Search", null);
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Balance_entity_1.BalanceEntity]),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "addBalance", null);
__decorate([
    (0, common_1.Put)(':id/add-approval'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('rootUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "addApproval", null);
__decorate([
    (0, common_1.Put)('/edit/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "editBalance", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BalanceController.prototype, "deleteBalance", null);
exports.BalanceController = BalanceController = __decorate([
    (0, swagger_1.ApiTags)('Balance'),
    (0, common_1.Controller)('Balance'),
    __metadata("design:paramtypes", [Balance_service_1.BalanceService])
], BalanceController);
//# sourceMappingURL=Balance.controller.js.map