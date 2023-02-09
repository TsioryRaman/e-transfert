import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Article } from "../article/article.entity";
import { DateInfo } from "../DateInfo.entity";

@Entity("category")
export class Category extends DateInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 255
    })
    name: string;

    @OneToMany(() => Article, (article) => article.category)
    article: Article;


}