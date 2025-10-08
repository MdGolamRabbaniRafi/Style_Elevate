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
exports.RootUserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const jwt_auth_gaurd_1 = require("../Auth/Gaurds/jwt-auth.gaurd");
const Role_enum_1 = require("../Auth/Role/Role.enum");
const Roles_decorate_1 = require("../Auth/Role/Roles.decorate");
const Roles_gaurd_1 = require("../Auth/Role/Roles.gaurd");
const swagger_1 = require("@nestjs/swagger");
const root_user_service_1 = require("./root-user.service");
let RootUserController = class RootUserController {
    constructor(rootUserService) {
        this.rootUserService = rootUserService;
    }
    getHello() {
        return this.rootUserService.getHello();
    }
    async SearchByID(Id, req) {
        console.log(req.headers['authorization']);
        return await this.rootUserService.SearchByID(Id);
    }
    async EditUserProfile(Id, updatedData) {
        return await this.rootUserService.EditUserProfileByID(Id, updatedData);
    }
    async ChangeProfilePicture(Id, myfile) {
        let imageUrl = process.env.Auth_Image_Destination;
        imageUrl = `${imageUrl}${myfile.filename}`;
        const trimmedPath = imageUrl.replace(process.env.Host_path, '');
        const isProduction = process.env.NODE_ENV === 'production';
        let finalUrl;
        if (isProduction) {
            finalUrl = `${process.env.Host_url}${trimmedPath}`;
        }
        else {
            finalUrl = trimmedPath;
        }
        const Image = finalUrl;
        return await this.rootUserService.ChangeProfilePicture(Id, Image);
    }
    async ChangePassword(Id, Password) {
        return await this.rootUserService.ChangePassword(Password, Id);
    }
    async newPassword(Id, newPassword) {
        return await this.rootUserService.newPassword(newPassword, Id);
    }
    async Search() {
        return await this.rootUserService.getAllUsers();
    }
    async deleteUser(Id) {
        const deletionResult = await this.rootUserService.deleteUser(Id);
        if (deletionResult) {
            return { message: 'User and profile image deleted successfully' };
        }
        else {
            return { message: 'User not found or deletion failed' };
        }
    }
    async forceFullyDelete(Id) {
        const deletionResult = await this.rootUserService.forceFullyDelete(Id);
        if (deletionResult) {
            return { message: 'User and profile deleted successfully' };
        }
        else {
            return { message: 'User not found or deletion failed' };
        }
    }
};
exports.RootUserController = RootUserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], RootUserController.prototype, "getHello", null);
__decorate([
    (0, Roles_decorate_1.Roles)(Role_enum_1.Role.Root),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtGaurd, Roles_gaurd_1.RolesGaurd),
    (0, common_1.Get)('/search/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RootUserController.prototype, "SearchByID", null);
__decorate([
    (0, Roles_decorate_1.Roles)(Role_enum_1.Role.Root),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtGaurd, Roles_gaurd_1.RolesGaurd),
    (0, common_1.Put)('/profile/edit/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RootUserController.prototype, "EditUserProfile", null);
__decorate([
    (0, Roles_decorate_1.Roles)(Role_enum_1.Role.Root),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtGaurd, Roles_gaurd_1.RolesGaurd),
    (0, common_1.Put)('/ChangeProfilePicture/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('ProfilePicture', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
                cb(null, true);
            }
            else {
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 1000000 },
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                let urlPath = process.env.Auth_Image_Destination;
                if (urlPath.startsWith(process.env.Host_url)) {
                    const localPath = urlPath.replace(process.env.Host_url, process.env.Host_path);
                    cb(null, (0, path_1.resolve)(localPath));
                }
                else {
                    cb(null, (0, path_1.resolve)(urlPath));
                }
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const extension = (0, path_1.extname)(file.originalname);
                const filename = `${uniqueSuffix}${extension}`;
                cb(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RootUserController.prototype, "ChangeProfilePicture", null);
__decorate([
    (0, Roles_decorate_1.Roles)(Role_enum_1.Role.Root),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtGaurd, Roles_gaurd_1.RolesGaurd),
    (0, common_1.Put)('/ChangePassword/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RootUserController.prototype, "ChangePassword", null);
__decorate([
    (0, Roles_decorate_1.Roles)(Role_enum_1.Role.Root),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtGaurd, Roles_gaurd_1.RolesGaurd),
    (0, common_1.Put)('/newPassword/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RootUserController.prototype, "newPassword", null);
__decorate([
    (0, Roles_decorate_1.Roles)(Role_enum_1.Role.Root),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtGaurd, Roles_gaurd_1.RolesGaurd),
    (0, common_1.Get)('/Search'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RootUserController.prototype, "Search", null);
__decorate([
    (0, Roles_decorate_1.Roles)(Role_enum_1.Role.Root),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtGaurd, Roles_gaurd_1.RolesGaurd),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RootUserController.prototype, "deleteUser", null);
__decorate([
    (0, Roles_decorate_1.Roles)(Role_enum_1.Role.Root),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtGaurd, Roles_gaurd_1.RolesGaurd),
    (0, common_1.Delete)('/forceFullyDelete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RootUserController.prototype, "forceFullyDelete", null);
exports.RootUserController = RootUserController = __decorate([
    (0, swagger_1.ApiTags)('RootUser'),
    (0, common_1.Controller)('RootUser'),
    __metadata("design:paramtypes", [root_user_service_1.RootUserService])
], RootUserController);
//# sourceMappingURL=root-user.controller.js.map