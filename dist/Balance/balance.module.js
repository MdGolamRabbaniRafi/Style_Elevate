"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Balance_entity_1 = require("./Balance.entity");
const Balance_service_1 = require("./Balance.service");
const Balance_controller_1 = require("./Balance.controller");
const root_user_entity_1 = require("../Root-User/root-user.entity");
let BalanceModule = class BalanceModule {
};
exports.BalanceModule = BalanceModule;
exports.BalanceModule = BalanceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Balance_entity_1.BalanceEntity, root_user_entity_1.RootUserEntity])],
        controllers: [Balance_controller_1.BalanceController],
        providers: [Balance_service_1.BalanceService, typeorm_1.TypeOrmModule],
    })
], BalanceModule);
//# sourceMappingURL=balance.module.js.map