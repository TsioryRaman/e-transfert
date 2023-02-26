import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/user/user.entity';
import { UserService } from 'src/user/user.service';
import { EncodePassword } from 'src/user/utils/bcrypt-encode';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/entity/user/dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private encodePassword: EncodePassword,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    console.log(user);
    //Teste si le mot de passe match
    if (user && (await this.encodePassword.compare(user.password,pass))) {

      const tokens = await this.getTokens(user.id.toString(), user.username);
      await this.updateRefreshToken(user.id.toString(), tokens.refresh_token);

      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return this.getTokens(payload.sub.toString(), payload.username);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.encodePassword.encode(
      refreshToken
    );
    await this.userService.update(userId, {
      refresh_token: hashedRefreshToken,
    });
  }


  async getTokens(userId: string, username: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  // Creation de l'utilisateur
  async signup(createUserDto: CreateUserDto) {
    try {
      var user: User = this.userRepository.create(createUserDto);
      const error = await validate(user);
      if (error.length === 0) {
        const password = await this.encodePassword.encode(
          createUserDto.password,
        );
        user.password = password;
        try {
          const { password, ..._user } = await this.userRepository.save(user);
          const { refresh_token } = await this.getTokens(
            _user.id.toString(),
            _user.username,
          );
          return this.userRepository.save({ ..._user, refresh_token });
        } catch (error) {
          throw new HttpException(error.sqlMessage, HttpStatus.NOT_ACCEPTABLE);
        }
      }
      throw new HttpException(error, HttpStatus.NOT_ACCEPTABLE);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.findUser(userId);
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');
      console.log(user.refresh_token)
    const refreshTokenMatches = await argon2.verify(
      user.refresh_token,
      refreshToken
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id.toString(), user.username);
    await this.updateRefreshToken(user.id.toString(), tokens.refresh_token);
    return tokens;
  }


	async logout(userId: string) {
    return this.userService.update(userId, { refresh_token: null });

  
  }
}
