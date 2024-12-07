import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";

@Controller('users')
export class UserController { 

  @Post()
  async create(@Body() body: any) { 
    return {body}
  }
  
  @Get()
  async read(){ 
    return { users: []}
  }
 
  @Get(':id')
  async readOne(@Param() params: string){ 
    return {user: {}, params}
  }

  @Put(':id')
  async update(@Body() body: any, @Param() params: string) { 
    return{ 
      method: 'put',
      body,
      params
    }
  }

  @Patch(':id')
    async updatePartial(@Body() body: any, @Param() params: string){ 
      return{ 
        method: 'patch',
        body,
        params
      }
    }

  @Delete(':id')
  async delete(@Param() params: string){ 
    return{ 
      params 
    }
  }
}