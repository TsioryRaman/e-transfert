import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/entity/fileTransfert/file.entity';
import { Filetransfert } from 'src/entity/fileTransfert/filetransfert.entity';
import { User } from 'src/entity/user/user.entity';
import { FiletransferController } from './filetransfer.controller';
import { FileTransfertService } from './service/file-transfert.service';

@Module({
  controllers: [FiletransferController],
  providers: [FileTransfertService],
  imports: [TypeOrmModule.forFeature([User, File, Filetransfert])]
})
export class FileTransfertModule { }
