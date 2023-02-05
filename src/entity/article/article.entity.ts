import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category.entity";
import { DateInfo } from "../DateInfo.entity";

@Entity("article")
export class Article extends DateInfo{
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

    @ManyToOne(()=>Category,(category)=>category.article)
    @JoinColumn()
    category:Category;
}