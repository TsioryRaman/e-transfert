import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncodePassword {

    constructor(private configService:ConfigService){

    }

    async encode(password:string) {
        const salt = await bcrypt.genSalt(+process.env.SALT);
        const mdp = await bcrypt.hash(password, salt);
        return mdp;
    }

    async compare(passordPlainText:string,hash:string):Promise<Boolean> {
        try{
            return bcrypt.compare(passordPlainText,hash);
        }catch(e){
            console.log(e);
            throw e;
        }
    }

}