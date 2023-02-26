import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';

@Injectable()
export class EncodePassword {

    constructor(private configService:ConfigService){

    }

    async encode(password:string) {
        // const salt = await bcrypt.genSalt(+process.env.SALT);
        const mdp = await argon2.hash(password);
        return mdp;
    }

    async compare(hash:string,passordPlainText:string):Promise<Boolean> {
        try{
            return argon2.verify(hash,passordPlainText);
        }catch(e){
            console.log(e);
            throw e;
        }
    }

}