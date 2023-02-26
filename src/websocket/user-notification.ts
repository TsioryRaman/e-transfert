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
        origin:"http://localhost:5173"
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
            socket.broadcast.emit('connected',{
                id:socket.id,
            });
        })
    }

    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: any): string {
        console.log(data)
        let value = JSON.parse(data);

        this.server.to(value.id+"").emit("test", "coucou")
        return data + " lelika";
    }

}