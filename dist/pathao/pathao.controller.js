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
exports.PathaoController = void 0;
const common_1 = require("@nestjs/common");
const pathao_service_1 = require("./pathao.service");
const swagger_1 = require("@nestjs/swagger");
let PathaoController = class PathaoController {
    constructor(pathaoService) {
        this.pathaoService = pathaoService;
    }
    async createOrder(orderData) {
        console.log("📦 Received Order Data:", JSON.stringify(orderData));
        const response = await this.pathaoService.createOrder(orderData);
        return response;
    }
};
exports.PathaoController = PathaoController;
__decorate([
    (0, common_1.Post)('create-order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PathaoController.prototype, "createOrder", null);
exports.PathaoController = PathaoController = __decorate([
    (0, swagger_1.ApiTags)('pathao'),
    (0, common_1.Controller)('pathao'),
    __metadata("design:paramtypes", [pathao_service_1.PathaoService])
], PathaoController);
//# sourceMappingURL=pathao.controller.js.map