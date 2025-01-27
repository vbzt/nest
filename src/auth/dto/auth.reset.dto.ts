import { IsJWT, IsString, Min } from "class-validator";

export class AuthResetDTO{ 
  @IsString()
  @Min(6)
  password: string;

  @IsJWT()
  token: string

}