import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncodePassword {

    async encode(password:string) {
        const salt = await bcrypt.genSalt(+process.env.SALT);
        const mdp = await bcrypt.hash(password, salt);
        console.log("MDP :",mdp)
        return mdp;
    }

    async compare(passordPlainText:string,hash:string):Promise<Boolean> {
        return bcrypt.compare(passordPlainText,hash);
    }

}