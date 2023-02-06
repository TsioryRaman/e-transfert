import { Module } from '@nestjs/common';
import { UserNotification } from './user-notification';

@Module({
    providers: [UserNotification]
})
export class WebsocketModule {
}
