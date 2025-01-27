import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth.login.dto";
import { AuthRegisterDTO } from "./dto/auth.register.dto";
import { AuthForgotDTO } from "./dto/auth.forgot.dto";
import { AuthResetDTO } from "./dto/auth.reset.dto";
import { UserService } from "src/user/user.service";

@Controller('auth')
export class AuthController{ 
  
  constructor(private readonly UserService: UserService){}

  @Post('login')
  async login(@Body() body: AuthLoginDTO){ }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO){
      return this.UserService.create(body)
   }

  @Post('forgot')
  async forgot(@Body() body: AuthForgotDTO){ }
  
  @Post('reset')
  async reset(@Body() body: AuthResetDTO){ }
}