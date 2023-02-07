import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateInfo } from "../DateInfo.entity";
import { Filetransfert } from "./filetransfert.entity";

export class File extends DateInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;
    @Column()
    size: number;
    @Column()
    originalName: string;
    @Column()
    destination: string;
    @Column()
    filetype: string;
    @ManyToOne(() => Filetransfert, (file) => file.id)
    file: Filetransfert
}