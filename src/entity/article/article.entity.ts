import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("article")
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length:255
    })
    name: string;

    @Column({
        length:255
    })
    description: string;

    @Column({
        default: false
    })
    isPublished:boolean;
}