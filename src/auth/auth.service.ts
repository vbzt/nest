import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth.register.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService{ 

    constructor(private readonly JWTService: JwtService, 
                private readonly prisma: PrismaService,
                private readonly userService: UserService){}

    async createToken( user: User ){ 
      return {
        accessToken: this.JWTService.sign( { 
          id: user.id, 
          name: user.name, 
          email: user.email 
        }, {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: 'login',
          audience: 'users'
        } )
      }
    }

    async checkToken(token: string){ 
      // return this.JWTService.verify(token)
    }

    async login(email: string, password: string){ 
      const user = await this.prisma.user.findFirst({ where: {email, password} })
      if(!user) throw new UnauthorizedException('Email ou senha incorretos.') 

      return this.createToken(user)
    }

    async forgot(email: string){ 
      const user = await this.prisma.user.findFirst({ where: { email } })
      if(!user){ 
        throw new UnauthorizedException('Email não encontrado.')   
      }

      //TO DO: Enviar Email
      return true
    }

    async reset(password: string, token: string){ 

      //TODO Validate token

      const id = 0

      const user = await this.prisma.user.update({
        where: { id },
        data: { password }
      })
      return this.createToken(user)
    }

    async register(data: AuthRegisterDTO){ 
      const user = await this.userService.create(data)
      return this.createToken(user)
    }
}