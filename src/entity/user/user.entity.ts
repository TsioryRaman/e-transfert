import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { IsEmail, MaxLength, MinLength } from "class-validator"
import { DateInfo } from "../DateInfo.entity";
@Entity("user")
export class User extends DateInfo{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        length:255,
        nullable:false,
        comment: "Nom d'utilisateur",
        unique:true
    })
    @MinLength(4)
    @MaxLength(255)
    username:string;

    @Column({
        length:255,
        nullable:false,
        comment: "Mot de passe",
        unique:false
    })
    @MinLength(6)
    @MaxLength(255)
    password:string;

    @Column({unique:true})
    @IsEmail()
    @MaxLength(255)
    email:string;
}