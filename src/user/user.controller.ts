import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchtUserDto } from "./dto/update-patch-dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param.id.decorator";

@Controller('users')
export class UserController { 

  constructor(private readonly userService: UserService){

  }

  @Post()
  async create(@Body()  data: CreateUserDTO) { 
    return this.userService.create( data )
  }
  
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