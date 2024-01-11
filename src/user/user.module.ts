import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user/user.entity';
import { EncodePassword } from './utils/bcrypt-encode';

@Module({
  providers: [UserService,EncodePassword,EncodePassword],
  exports: [UserService,TypeOrmModule],
  controllers: [UserController],
  imports:[TypeOrmModule.forFeature([User])]
})
export class UserModule {}
