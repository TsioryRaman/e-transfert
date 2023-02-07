import { CreateUserDto } from "src/entity/user/dto/create-user.dto";
import { CreateContextOptions } from "vm";

export class CreateFileDto {
    filename: string;
    size: number;
    originalName: string;
    destination: string;
    filetype: string;

}