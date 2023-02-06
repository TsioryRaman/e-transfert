import { Module } from '@nestjs/common';
import { UserNotification } from './user-notification';


require('dotenv').config()
@Module({
    providers: [UserNotification]
})
export class WebsocketModule {
}
