import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayDisconnect
} from "@nestjs/websockets";
import {Server} from "socket.io";

@WebSocketGateway(8888,{
    cors: {
        origin:process.env.FRONT_ENDPOINT
    }
})
export class UserNotification implements OnGatewayInit,OnGatewayDisconnect{

    @WebSocketServer()
    server:Server;

    handleDisconnect(client: any) {
        console.log("disconected server",client.id);
    }

    afterInit() {
        this.server.on('connection',(socket)=> {
            console.log(socket.id);
            console.log("connected")
        })
    }

    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string): string {
        this.server.emit('message',{
            data:data,
        });
        return data + " lelika";
    }


}