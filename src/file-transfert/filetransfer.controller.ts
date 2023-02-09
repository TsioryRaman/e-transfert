import { Controller, Body, ParseIntPipe, Post, Req, Request, UploadedFile, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileTransfertService } from './service/file-transfert.service';

@Controller('filetransfer')
export class FiletransferController {
    constructor(private fileTransfertService: FileTransfertService) {
    }

    @UseInterceptors(AnyFilesInterceptor())
    @Post()
    SendFile(
        @Body() body,
        @Request() req,
        @UploadedFiles() files: Array<Express.Multer.File>
    ) {
        console.log(files);
        return this.fileTransfertService.SendFile(1, body.idReceiver, files)

    }

}
