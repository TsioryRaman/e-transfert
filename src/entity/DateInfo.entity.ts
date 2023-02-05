import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class DateInfo {
    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updateDate: Date;
}