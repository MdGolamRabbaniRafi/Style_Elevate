"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootUserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Roles_gaurd_1 = require("../Auth/Role/Roles.gaurd");
const root_user_controller_1 = require("./root-user.controller");
const root_user_entity_1 = require("./root-user.entity");
const root_user_service_1 = require("./root-user.service");
const balance_entity_1 = require("../Balance/balance.entity");
let RootUserModule = class RootUserModule {
};
exports.RootUserModule = RootUserModule;
exports.RootUserModule = RootUserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([root_user_entity_1.RootUserEntity, balance_entity_1.BalanceEntity])],
        controllers: [root_user_controller_1.RootUserController],
        providers: [root_user_service_1.RootUserService, Roles_gaurd_1.RolesGaurd],
        exports: [root_user_service_1.RootUserService, typeorm_1.TypeOrmModule],
    })
], RootUserModule);
//# sourceMappingURL=root-user.module.js.map