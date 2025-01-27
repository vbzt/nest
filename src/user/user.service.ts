import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchtUserDto } from "./dto/update-patch-dto";

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { 

  }

  async create( data: CreateUserDTO){ 
    return this.prisma.user.create({ data })
  }

  async read(){ 
    return this.prisma.user.findMany()
  }

  async readOne(id: number){ 
    await this.userExists(id)
    return this.prisma.user.findUnique({ where: { id }})
  }

  async update(id:number,  data: UpdatePutUserDto){ 
    await this.userExists(id)
    return this.prisma.user.update({ data, where: { id }})
  }

  async updatePartial(id: number, data: UpdatePatchtUserDto){ 
    await this.userExists(id)
    return this.prisma.user.update( { data, where: { id }})
  }

  async delete(id: number){ 
    await this.userExists(id)
    return await this.prisma.user.delete( { where: { id } } )
  }

  async userExists(id: number){ 
    if(!(await this.prisma.user.count({
      where: { id }
    }))){ 
      throw new NotFoundException(`O usuario não existe. `)
    }
  }

}