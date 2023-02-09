
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, JoinTable, ManyToOne } from 'typeorm';
import { DateInfo } from '../DateInfo.entity';
import { User } from '../user/user.entity';
import { File } from './file.entity';

@Entity()
export class Filetransfert extends DateInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.sendFileTransfert,{nullable:false})
    sendBy: User;

    @ManyToOne(() => User, (user) => user.receiveFileTransfert,{nullable:false})
    sendTo: User;

    @OneToMany(() => File, (file) => file.filetransfert,{nullable:false})
    file: File[];
}
