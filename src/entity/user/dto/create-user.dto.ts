import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Match } from "src/validator/match.validator";

export class CreateUserDto {
    id: number;

    @IsString()
    @MinLength(4)
    @MaxLength(20,{message:"Le nom d'utilisateur ne peut contenir que 20 caracteres"})
    username: string;

    @IsEmail()
    email: string;

    @MaxLength(12)
    @MinLength(4)
    @IsString()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Mot de passe tres vulnerable'})
    password: string;

    @MaxLength(12)
    @MinLength(4)
    @IsString()
    @Match("password")
    confirmPassword?:string;

    refresh_token:string;
}