import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import multer from 'multer';
import { File } from 'src/entity/fileTransfert/file.entity';
import { Filetransfert } from 'src/entity/fileTransfert/filetransfert.entity';
import { User } from 'src/entity/user/user.entity';
import { FiletransferController } from './filetransfer.controller';
import { FileTransfertService } from './service/file-transfert.service';

@Module({
  controllers: [FiletransferController],
  providers: [FileTransfertService],
  imports: [TypeOrmModule.forFeature([User, File, Filetransfert]), MulterModule.register({
    dest: './upload'

  })]
})
export class FileTransfertModule { }
