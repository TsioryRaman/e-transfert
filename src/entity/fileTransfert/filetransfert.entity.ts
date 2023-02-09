
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, JoinTable, ManyToOne } from 'typeorm';
import { DateInfo } from '../DateInfo.entity';
import { User } from '../user/user.entity';
import { File } from './file.entity';

@Entity()
export class Filetransfert extends DateInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.filetransfert)
    sendBy: User;

    @OneToMany(() => User, (user) => user.id)
    sendTo: User;

    @OneToMany(() => File, (file) => file.filetransfert)
    file: File[];
}
