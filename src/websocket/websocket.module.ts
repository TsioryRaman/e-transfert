import { Module } from '@nestjs/common';
import { UserNotification } from './user-notification';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'src/config/configurations';
@Module({
    imports:[ConfigModule.forRoot({
        envFilePath: [`.env.${process.env.NODE_ENV}.local`,`.env.${process.env.NODE_ENV}`,'.env'],
        load: [configuration]
      })],
    providers: [UserNotification],
    exports: [UserNotification]
})
export class WebsocketModule {
}
