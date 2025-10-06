import { Repository } from 'typeorm';
import { RootUserEntity } from './root-user.entity';
export declare class RootUserService {
    private rootUserRepo;
    constructor(rootUserRepo: Repository<RootUserEntity>);
    getHello(): string;
    SearchByID(Id: number): Promise<RootUserEntity | null>;
    EditUserProfileByID(Id: number, updatedData: Partial<RootUserEntity>): Promise<RootUserEntity | null>;
    deleteImageFile(imagePath: string): Promise<{
        message: string;
    }>;
    ChangeProfilePicture(Id: number, path: string): Promise<RootUserEntity | {
        message: string;
    }>;
    getAllUsers(): Promise<RootUserEntity[] | null>;
    findByEmail(email: string): Promise<RootUserEntity | null>;
    validate(email: string, password: string): Promise<RootUserEntity | null>;
    ChangePassword(Password: {
        oldPassword: string;
        newPassword: string;
    }, Id: number): Promise<any>;
    newPassword(newPassword: string, Id: number): Promise<any>;
    SignUp(RootUserEntity: RootUserEntity): Promise<RootUserEntity | boolean>;
    deleteUser(Id: number): Promise<boolean>;
    forceFullyDelete(Id: number): Promise<boolean>;
}
