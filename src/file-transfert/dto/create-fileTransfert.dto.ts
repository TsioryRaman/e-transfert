import { CreateUserDto } from "src/entity/user/dto/create-user.dto";
import { User } from "src/entity/user/user.entity";
import { CreateFileDto } from "./file.dto";

export class CreateFileTransfertDto {
    sendBy: User;
    sendTo: User;
    file: CreateFileDto[];
}