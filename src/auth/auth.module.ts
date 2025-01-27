import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";


@Module({ 
  imports: [JwtModule.register({
    secret: 'cWxlX15HR1oiUHlQM25gXVdjbmMxWG/Co2k3a0RCYkY5QTVkfnMxUzw2RHBha0hhfVs2',
    
    }),
    UserModule

  ],
  controllers: [AuthController]
})
export class AuthModule{ 

}