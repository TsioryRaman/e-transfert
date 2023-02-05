import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { CreateUserDto } from 'src/entity/user/dto/create-user.dto';
import { User } from 'src/entity/user/user.entity';
import { Repository } from 'typeorm';
import { EncodePassword } from './utils/bcrypt-encode';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository:Repository<User>,private encodePassword:EncodePassword) {

  }

    private readonly users = [
        {
          userId: 1,
          username: 'john',
          password: 'changeme',
        },
        {
          userId: 2,
          username: 'maria',
          password: 'guess',
        },
      ];
    
    // Creation de l'utilisateur
    async create(createUserDto:CreateUserDto) {
      try{
        var user:User = this.userRepository.create(createUserDto);
        const error = await validate(user);
        if(error.length === 0){
          const password = await this.encodePassword.encode(createUserDto.password);
          user.password = password;
          try{

            return await this.userRepository.save(user);
          }catch(error){
            throw new HttpException(error.sqlMessage,HttpStatus.NOT_ACCEPTABLE);
          }
        }
        throw new HttpException(error,HttpStatus.NOT_ACCEPTABLE);
      }catch(error){
        throw new HttpException(error,HttpStatus.BAD_REQUEST);
      }

    }

    async findOne(username:string){
      return this.userRepository.findOneBy({username});
    }

    async findUser(id:number){
      const {password,...user} =await this.userRepository.findOneBy({id});
      return user;
    }


}
