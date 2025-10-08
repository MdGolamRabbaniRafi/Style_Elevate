import { RootUserEntity } from './root-user.entity';
import { RootUserService } from './root-user.service';
export declare class RootUserController {
    private readonly rootUserService;
    constructor(rootUserService: RootUserService);
    getHello(): string;
    SearchByID(Id: number, req: any): Promise<null | RootUserEntity>;
    EditUserProfile(Id: number, updatedData: {
        name?: string;
        phone?: string;
        address?: string;
    }): Promise<RootUserEntity | null>;
    ChangeProfilePicture(Id: number, myfile: Express.Multer.File): Promise<{
        message: string;
    } | RootUserEntity>;
    ChangePassword(Id: number, Password: {
        oldPassword: string;
        newPassword: string;
    }): Promise<any>;
    newPassword(Id: number, newPassword: string): Promise<any>;
    Search(): Promise<RootUserEntity[] | null>;
    deleteUser(Id: number): Promise<{
        message: string;
    }>;
    forceFullyDelete(Id: number): Promise<{
        message: string;
    }>;
}
