import { Controller, Body, ParseIntPipe, Post, Req, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileTransfertService } from './service/file-transfert.service';

@Controller('filetransfer')
export class FiletransferController {
    constructor(private fileTransfertService: FileTransfertService) {
    }

    @UseInterceptors(FileInterceptor('file'))
    // @UseGuards(JwtAuthGuard)
    @Post()
    SendFile(
        @Body() body,
        @Request() req,
        @UploadedFile() file: Express.Multer.File
    ) {
        console.log(body)
        return this.fileTransfertService.SendFile(2, body.idReceiver, file)

    }

}
