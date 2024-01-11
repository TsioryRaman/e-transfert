import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { EncodePassword } from 'src/user/utils/bcrypt-encode';
import { AuthService } from './auth.service';
import { JwtStrategy } from './guard-strategy/jwt.strategy';
import { LocalStrategy } from './guard-strategy/local.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenStrategy } from './refresh-token-strategy';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entity/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    UserModule,
    JwtModule.register({
      global:true,
      secret:"fksdmfmdlksngd65g64f651gd351g321d32f1g3d21fg3g1f31g32d",
      signOptions: {expiresIn: `5000 min`}
    })
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy,EncodePassword,RefreshTokenStrategy],
  exports:[AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
