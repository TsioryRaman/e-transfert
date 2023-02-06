import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FiletransfertController } from './filetransfert.controller';



@Module({
  controllers: [FiletransfertController],
  imports : [MulterModule.register({
    dest: './upload',
})]
})
export class FiletransfertModule {}
