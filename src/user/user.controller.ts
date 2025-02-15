import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchtUserDto } from "./dto/update-patch-dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param.id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";
import { SkipThrottle } from "@nestjs/throttler";


@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard) 
@Controller('users')
@UseInterceptors(LogInterceptor)
export class UserController { 

  constructor(private readonly userService: UserService){

  }

  @Post()
  async create(@Body()  data: CreateUserDTO) { 
    return this.userService.create( data )
  }
  
  // @SkipThrottle() 
  @Get()
  async read(){ 
    return this.userService.read()
  }
  
  @Get(':id')
  async readOne(@ParamId() id: number){ 
    return this.userService.readOne(id)
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDto, @ParamId() id: number) { 
    return this.userService.update(id, data)
  }

  @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchtUserDto, @ParamId() id: number){ 
      return this.userService.updatePartial(id, data)
    }

  @Delete(':id')
  async delete(@ParamId() id: number){ 
    return this.userService.delete(id)
  }
}