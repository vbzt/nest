import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator"
import { Role } from "src/enums/role.enum"

export class CreateUserDTO{ 
  
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsStrongPassword({
    minLength: 6,
    minSymbols: 1,
    minUppercase: 1,
    minLowercase: 0,
    minNumbers: 1
  })
  password: string

  @IsOptional()
  @IsEnum(Role)
  role: number
}