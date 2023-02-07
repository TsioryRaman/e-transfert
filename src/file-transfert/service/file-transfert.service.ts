import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/entity/fileTransfert/file.entity';
import { Filetransfert } from 'src/entity/fileTransfert/filetransfert.entity';
import { User } from 'src/entity/user/user.entity';
import { Repository } from 'typeorm';
import { CreateFileDto } from '../dto/file.dto';

@Injectable()
export class FileTransfertService {

    constructor(

        @InjectRepository(File) private fileRepository: Repository<File>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Filetransfert) private fileTransfertRepository: Repository<Filetransfert>
    ) { }
    async SendFile(senderId: number, reiceverId: number, file) {
        const sender = await this.userRepository.findOneBy({ id: +senderId });
        const reicever = await this.userRepository.findOneBy({ id: +reiceverId });
        if (reicever) {
            const transfertFile = ""
        }
        const files = this.createFile(file);
    }
    private createFile(file) {
        const fileDTO: CreateFileDto = {
            originalName: file.originalName,
            size: file.size,
            filename: file.filename,
            destination: file.destination,
            filetype: file.mimetype,

        } as CreateFileDto;

        return this.fileRepository.create(fileDTO);
    }
    private createTransfertFile(sender: User, reicever: User, file: File) {
        const fileTransfertDto = {

        }
    }
}
