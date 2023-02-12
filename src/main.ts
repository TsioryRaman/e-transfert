import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './websocket/configuration/SocketIoAdapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const hosts = configService.get<string>('CORS.HOST');
  console.log(hosts)
  app.enableCors();
  // app.useWebSocketAdapter(new SocketIoAdapter(app,configService));
  await app.listen(3000);
}
bootstrap();
