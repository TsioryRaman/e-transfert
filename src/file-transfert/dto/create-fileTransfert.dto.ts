import { CreateUserDto } from "src/entity/user/dto/create-user.dto";
import { CreateFileDto } from "./file.dto";

export class CreateFileTransfertDto {
    sendBy: CreateUserDto;
    sendFrom: CreateUserDto;
    file: CreateFileDto[];
}