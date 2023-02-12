import { INestApplicationContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IoAdapter } from "@nestjs/platform-socket.io";

export class SocketIoAdapter extends IoAdapter {
    constructor(
        private app:INestApplicationContext,
        private configService:ConfigService
    ){
        super(app);
    }

    createIOServer(port: number, options?: any) {
        port = this.configService.get<number>("SOCKETIO.SERVER.PORT");
        const path:string = this.configService.get<string>('SOCKETIO.SERVER.PATH');
        const origin:string = this.configService.get<string>(
            'SOCKETIO.SERVER.CORS.ORIGIN',
        );
        options.path = path;
        options.cors = { origin };
        const server = super.createIOServer(port, options);
        return server;
    }
}