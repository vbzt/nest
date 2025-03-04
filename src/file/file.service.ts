import { BadRequestException, Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';

@Injectable()
export class FileService {

  async upload(file: Express.Multer.File, path: string){
    try {
      await writeFile(path, file.buffer)
    } catch (e) {
      throw new BadRequestException(e)
    }
    
    return{success:true}
  }
}
