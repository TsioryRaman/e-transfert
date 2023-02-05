import { Controller, Get, HttpException, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService, private userService:UserService){}

    @UseGuards(JwtAuthGuard)
    @Get('refresh-token')
    async refreshToken(@Request() req){
        try{
            return this.authService.login(await this.userService.findOne(req.username));
        }catch(error){
            throw new HttpException("Erreur innatendu",HttpStatus.NOT_FOUND);
        }
    }

}
