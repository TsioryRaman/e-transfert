import { Controller, Post, Req, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('filetransfert')
export class FiletransfertController {
    @Post()

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File,@Request() req){
        console.log(req.user)
        console.log(file)
        return req.user;
    }
}
