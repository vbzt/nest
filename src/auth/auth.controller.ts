import { Body, Controller, FileTypeValidator, Headers, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth.login.dto";
import { AuthRegisterDTO } from "./dto/auth.register.dto";
import { AuthForgotDTO } from "./dto/auth.forgot.dto";
import { AuthResetDTO } from "./dto/auth.reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { join } from "path";
import { FileService } from "src/file/file.service";

@Controller('auth')
export class AuthController{ 
  
  constructor(
    private readonly userService: UserService, 
    private readonly authService: AuthService,
    private readonly fileService: FileService
  
  ){}

  @Post('login')
  async login(@Body() body: AuthLoginDTO){ 
    console.log(body)
    return this.authService.login(body.email, body.password)
  }

  @Post('register') 
  async register(@Body() body: AuthRegisterDTO){
      return this.authService.register(body)
   }

  @Post('forgot')
  async forgot(@Body() body: AuthForgotDTO){ 
    return this.authService.forgot(body.email)
  }
  
  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO){ 
    return this.authService.reset(password, token)
  }


  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User('email') user){ 
    return { user }
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(@User() user, @UploadedFile(  
    new ParseFilePipe({ validators: [ new FileTypeValidator( { fileType: 'image/*' } ), new MaxFileSizeValidator( { maxSize: 1024 * 64 } ) ] })) photo: Express.Multer.File){ 
    
    const path = join(__dirname, '..', '..', 'storage', 'photos', `photo-${user.id}.png` )
    const result = await this.fileService.upload(photo, path)
    return { user, result }
  }

  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard)
  @Post('files')
  async uploadFiles(@User() user, @UploadedFiles() files: Express.Multer.File[]){ 

    return {user, files}
  } 

  
  @UseInterceptors(FileFieldsInterceptor(
    [
      {
        name: 'photo',
        maxCount: 1
      },
      {
        name: 'documents',
        maxCount: 10
      }
  ]))
  @UseGuards(AuthGuard)
  @Post('files-field')
  async uploadFilesFields(@User() user, @UploadedFiles() files: {photo: Express.Multer.File, documents: Express.Multer.File[]}){ 

    return { files }
  } 
}