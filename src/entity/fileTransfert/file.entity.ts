import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateInfo } from "../DateInfo.entity";
import { Filetransfert } from "./filetransfert.entity";

export class File extends DateInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @ManyToOne(() => Filetransfert, (file) => file.id)
    file: Filetransfert
}