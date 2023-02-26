import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/common/jwt-auth.guard';
import { CreateUserDto } from 'src/entity/user/dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService){
        
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getUser(@Request() req) {
      return this.userService.findUser(+req.user.id);
    }

}
