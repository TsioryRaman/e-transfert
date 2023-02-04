import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("category")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length:255
    })
    name: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updateDate: Date;
}