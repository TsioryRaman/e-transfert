import { IsOptional } from "class-validator";
import { Column, Entity, IsNull, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DateInfo } from "../DateInfo.entity";
import { Filetransfert } from "./filetransfert.entity";

@Entity()
export class File extends DateInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
        default: null
    })

    fileName?: string;
    @Column()
    size: number;
    @Column()
    originalName: string;
    @Column()
    destination: string;
    @Column()
    filetype: string;
    @ManyToOne(() => Filetransfert, (filetransfert) => filetransfert.file)
    @JoinColumn()
    filetransfert: Filetransfert;
}