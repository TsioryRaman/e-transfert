import { CreateUserDto } from "src/entity/user/dto/create-user.dto";
import { CreateContextOptions } from "vm";

export class CreateFileDto {
    sendBy: CreateUserDto
    sendFrom: CreateUserDto
}