import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/entity/user/dto/create-user.dto';
import { User } from 'src/entity/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './common/jwt-auth.guard';
import { LocalAuthGuard } from './common/local-auth-guard';
import { RefreshTokenGuard } from './common/refreshToken.guards';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post("")
  signUp(@Body() createUserDto: CreateUserDto) {
    console.log("Ici")
    console.log(createUserDto)
    return this.authService.signup(createUserDto);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  refreshTokens(@Request() req) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Request() req) {
    this.authService.logout(req.user['sub']);
  }

}
