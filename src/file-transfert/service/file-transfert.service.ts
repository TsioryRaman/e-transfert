import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/entity/fileTransfert/file.entity';
import { Filetransfert } from 'src/entity/fileTransfert/filetransfert.entity';
import { User } from 'src/entity/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileTransfertService {
    constructor(
        @InjectRepository(File) private fileRepository: Repository<File>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Filetransfert) private fileTransfertRepository: Repository<Filetransfert>
    ) { }
    async SendFile(senderId: number, reiceverId: number) {
        const sender = await this.userRepository.findOneBy({ id: +senderId });
        const reicever = await this.userRepository.findOneBy({ id: +reiceverId });


    }
}
