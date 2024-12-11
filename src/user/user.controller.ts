import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchtUserDto } from "./dto/update-patch-dto";
import { UserService } from "./user.service";

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
  async readOne(@Param('id', ParseIntPipe) id: number){ 
    return this.userService.readOne(id)
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDto, @Param('id', ParseIntPipe) id: number) { 
    return this.userService.update(id, data)
  }

  @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchtUserDto, @Param('id', ParseIntPipe) id: number){ 
      return this.userService.updatePartial(id, data)
    }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number){ 
    return this.userService.delete(id)
  }
}