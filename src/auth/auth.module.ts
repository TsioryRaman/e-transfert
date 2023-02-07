import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { EncodePassword } from 'src/user/utils/bcrypt-encode';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}.local`,`.env.${process.env.NODE_ENV}`,'.env'],
    }),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret:process.env.JWT_SECRET,
      signOptions: {expiresIn: `${process.env.JWT_EXPIRE_TIME} min`}
    }),
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy,EncodePassword],
  exports:[AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
