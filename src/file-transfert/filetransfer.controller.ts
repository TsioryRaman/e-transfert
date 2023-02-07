import { Controller, Param, ParseIntPipe, Post, Req, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileTransfertService } from './service/file-transfert.service';

@Controller('filetransfer')
export class FiletransferController {
    constructor(private fileTransfertService: FileTransfertService) {
    }
    @UseGuards(JwtAuthGuard)
    @Post(':receiverId')

    @UseInterceptors(FileInterceptor('file'))

    SendFile(
        @Param('receiverId', ParseIntPipe) receiverId,
        @Request() req,
        // @UploadedFile() file: Express.Multer.File
    ) {
        return this.fileTransfertService.SendFile(+req.user.id, receiverId)

    }

}
