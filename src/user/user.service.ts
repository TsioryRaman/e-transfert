import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { CreateUserDto } from 'src/entity/user/dto/create-user.dto';
import { User } from 'src/entity/user/user.entity';
import { Repository } from 'typeorm';
import { EncodePassword } from './utils/bcrypt-encode';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository:Repository<User>
    ) {

  }

    async findOne(username:string){
      return this.userRepository.findOne(
        {
          select:["id","username","password"],
          where:{username:username}
    });
    }

    async findUser(id:number){
      const {password,...user} = await this.userRepository.findOneBy({id});
      return user;
    }

    async update(id: string,updateUserDto): Promise<any> {
      return this.userRepository.update(id, updateUserDto);
    }
  


}
