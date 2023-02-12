
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, JoinTable, ManyToOne } from 'typeorm';
import { DateInfo } from '../DateInfo.entity';
import { User } from '../user/user.entity';
import { File } from './file.entity';

@Entity()
export class Filetransfert extends DateInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.sendFileTransfert,{nullable:false})
    @JoinColumn()
    sendBy: User;

    @ManyToOne(() => User, (user) => user.receiveFileTransfert,{nullable:false})
    @JoinColumn()
    sendTo: User;

    @OneToMany(() => File, (file) => file.filetransfert,{nullable:false,cascade:true})
    file: File[];
}
