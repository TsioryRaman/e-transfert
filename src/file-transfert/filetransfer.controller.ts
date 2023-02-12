import { Controller, Body, ParseIntPipe, Post, Req, Request, UploadedFile, UseGuards, UseInterceptors, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileTransfertService } from './file-transfert.service';

@Controller('filetransfer')
export class FiletransferController {
    constructor(private fileTransfertService: FileTransfertService) {
    }

    @UseInterceptors(AnyFilesInterceptor())
    @Post()
    SendFile(
        @Body() body,
        @Request() req,
        @UploadedFiles(new ParseFilePipe({
            validators: [
                // new FileTypeValidator({ fileType:  }),
            ],
        })) files: Array<Express.Multer.File>
    ) {
        console.log("Fichier: "+files)
        return this.fileTransfertService.SendFile(1, body.idReceiver, files);
    }

}
