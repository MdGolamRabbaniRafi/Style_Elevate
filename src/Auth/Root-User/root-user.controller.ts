import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { extname, resolve } from 'path';
import { JwtGaurd } from 'src/Auth/Gaurds/jwt-auth.gaurd';
import { Role } from 'src/Auth/Role/Role.enum';
import { Roles } from 'src/Auth/Role/Roles.decorate';
import { RolesGaurd } from 'src/Auth/Role/Roles.gaurd';
import { ApiTags } from '@nestjs/swagger';
import { RootUserEntity } from './root-user.entity';
import { RootUserService } from './root-user.service';

@ApiTags('RootUser')
@Controller('RootUser')
export class RootUserController {
  constructor(private readonly rootUserService: RootUserService) {}

  @Get()
  getHello(): string {
    return this.rootUserService.getHello();
  }

  @Roles(Role.Root)
  @UseGuards(JwtGaurd, RolesGaurd)
  @Get('/search/:id')
  async SearchByID(
    @Param('id', ParseIntPipe) Id: number,
    @Request() req,
  ): Promise<null | RootUserEntity> {
    console.log(req.headers['authorization']); // Optional: Debug token presence
    return await this.rootUserService.SearchByID(Id);
  }

  @Roles(Role.Root)
  @UseGuards(JwtGaurd, RolesGaurd)
  @Put('/profile/edit/:id')
  async EditUserProfile(
    @Param('id', ParseIntPipe) Id: number,
    @Body() updatedData: { name?: string; phone?: string; address?: string },
  ): Promise<RootUserEntity | null> {
    return await this.rootUserService.EditUserProfileByID(Id, updatedData);
  }

  @Roles(Role.Root)
  @UseGuards(JwtGaurd, RolesGaurd)
  @Put('/ChangeProfilePicture/:id')
  @UseInterceptors(
    FileInterceptor('ProfilePicture', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 1000000 }, // 100 KB limit
      storage: diskStorage({
        destination: (req, file, cb) => {
          let urlPath = process.env.Auth_Image_Destination;

          // Detect CPanel or similar hosting and convert URL to local directory path dynamically
          if (urlPath.startsWith(process.env.Host_url)) {
            // Convert the public URL path to the local file system path
            const localPath = urlPath.replace(
              process.env.Host_url,
              process.env.Host_path,
            );
            cb(null, resolve(localPath)); // Save to the local path in the server
          } else {
            // For other environments, use the resolved path as it is
            cb(null, resolve(urlPath));
          }
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          const filename = `${uniqueSuffix}${extension}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async ChangeProfilePicture(
    @Param('id', ParseIntPipe) Id: number,
    @UploadedFile() myfile: Express.Multer.File,
  ): Promise<{ message: string } | RootUserEntity> {
    let imageUrl = process.env.Auth_Image_Destination;
    imageUrl = `${imageUrl}${myfile.filename}`;
    const trimmedPath = imageUrl.replace(process.env.Host_path, '');
    const isProduction = process.env.NODE_ENV === 'production';
    let finalUrl: string;
    if (isProduction) {
      finalUrl = `${process.env.Host_url}${trimmedPath}`;
    } else {
      finalUrl = trimmedPath;
    }
    const Image = finalUrl;
    return await this.rootUserService.ChangeProfilePicture(Id, Image);
  }

  @Roles(Role.Root)
  @UseGuards(JwtGaurd, RolesGaurd)
  @Put('/ChangePassword/:id')
  async ChangePassword(
    @Param('id', ParseIntPipe) Id: number,
    @Body() Password: { oldPassword: string; newPassword: string },
  ): Promise<any> {
    return await this.rootUserService.ChangePassword(Password, Id);
  }

  @Roles(Role.Root)
  @UseGuards(JwtGaurd, RolesGaurd)
  @Put('/newPassword/:id')
  async newPassword(
    @Param('id', ParseIntPipe) Id: number,
    @Body('newPassword') newPassword: string,
  ): Promise<any> {
    return await this.rootUserService.newPassword(newPassword, Id);
  }

  @Roles(Role.Root)
  @UseGuards(JwtGaurd, RolesGaurd)
  @Get('/Search')
  async Search(): Promise<RootUserEntity[] | null> {
    return await this.rootUserService.getAllUsers();
  }

  @Roles(Role.Root)
  @UseGuards(JwtGaurd, RolesGaurd)
  @Delete('/delete/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) Id: number,
  ): Promise<{ message: string }> {
    const deletionResult = await this.rootUserService.deleteUser(Id);
    if (deletionResult) {
      return { message: 'User and profile image deleted successfully' };
    } else {
      return { message: 'User not found or deletion failed' };
    }
  }

  @Roles(Role.Root)
  @UseGuards(JwtGaurd, RolesGaurd)
  @Delete('/forceFullyDelete/:id')
  async forceFullyDelete(
    @Param('id', ParseIntPipe) Id: number,
  ): Promise<{ message: string }> {
    const deletionResult = await this.rootUserService.forceFullyDelete(Id);
    if (deletionResult) {
      return { message: 'User and profile deleted successfully' };
    } else {
      return { message: 'User not found or deletion failed' };
    }
  }
}
