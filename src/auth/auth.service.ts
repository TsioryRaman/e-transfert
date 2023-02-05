import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/user/user.entity';
import { UserService } from 'src/user/user.service';
import { EncodePassword } from 'src/user/utils/bcrypt-encode';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService ,
        private encodePassword:EncodePassword
    ){}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        //Teste si le mot de passe match
        if(user && await this.encodePassword.compare(pass,user.password)) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: User) {
        const payload = {username: user.username, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
