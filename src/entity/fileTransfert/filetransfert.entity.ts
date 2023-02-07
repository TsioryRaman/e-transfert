
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { DateInfo } from '../DateInfo.entity';
import { User } from '../user/user.entity';
import { File } from './file.entity';

@Entity()
export class Filetransfert extends DateInfo {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    // filename: string;

    @OneToOne(() => User, (sendBy) => sendBy.id)
    @JoinColumn()
    sendBy: User;

    @OneToOne(() => User, (sendTo) => sendTo.id)
    @JoinColumn()
    @Column()
    sendTo: User;

    @OneToMany(() => File, (files) => files.id)
    files: File;
}
