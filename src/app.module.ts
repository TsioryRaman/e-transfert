import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { entities } from './entity/entity';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { configuration } from './config/configurations';
import { WebsocketModule } from './websocket/websocket.module';
import { FileTransfertModule } from './file-transfert/file-transfert.module';
import { typeOrmConfig } from './config/typeormconfig';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}.local`,`.env.${process.env.NODE_ENV}`,'.env'],
      isGlobal:true,
      load: [configuration]
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CategoryModule,
    ArticleModule,
    AuthModule,
    UserModule,
    WebsocketModule,
    FileTransfertModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
