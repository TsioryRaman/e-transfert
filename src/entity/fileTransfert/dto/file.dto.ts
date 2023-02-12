import { IsOptional } from "class-validator";
import { CreateUserDto } from "src/entity/user/dto/create-user.dto";
import { CreateContextOptions } from "vm";
import { Filetransfert } from "../filetransfert.entity";

export class CreateFileDto {
    @IsOptional()
    fileName?: string;
    size: number;
    originalName: string;
    destination: string;
    filetype: string;

}