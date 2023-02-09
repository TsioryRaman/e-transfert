import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/entity/fileTransfert/file.entity';
import { Filetransfert } from 'src/entity/fileTransfert/filetransfert.entity';
import { User } from 'src/entity/user/user.entity';
import { Repository } from 'typeorm';
import { CreateFileDto } from '../dto/file.dto';
import { CreateFileTransfertDto } from '../dto/create-fileTransfert.dto';
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

            try {
                const fileDto = this.createFile(file);
                const fileEntity = await this.fileRepository.save(fileDto);

                const transfertFile = this.createTransfertFile(sender, reicever, fileEntity)
                await this.fileTransfertRepository.save(transfertFile)
            } catch (e) {
                console.error(e)
            }

        } else {
            throw new NotFoundException(`Le destinataire n'existe pas`)
        }
        return;

    }
    private createFile(file) {
        const fileDTO: CreateFileDto = {
            originalName: file.originalname,
            size: file.size,
            fileName: file.filename,
            destination: file.destination,
            filetype: file.mimetype,

        };
        return this.fileRepository.create(fileDTO);
    }
    private createTransfertFile(sender: User, reicever: User, filesend: File) {
        const fileTransfertDto: CreateFileTransfertDto = {
            sendBy: sender,
            sendTo: reicever,
            file: [filesend]
        }
        return this.fileTransfertRepository.create(fileTransfertDto)
    }
}
