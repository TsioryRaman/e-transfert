import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { EncodePassword } from 'src/user/utils/bcrypt-encode';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

require('dotenv').config()

@Module({
  imports:[
    UserModule,
    PassportModule,
    JwtModule.register({
      secret:process.env.JWT_SECRET,
      signOptions: {expiresIn: `${process.env.JWT_EXPIRE_TIME} min`}
    }),
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy,EncodePassword],
  exports:[AuthService]
})
export class AuthModule {}
