import { IsEmail, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    id:number;

    username:string;

    email:string;
    
    password:string;
}