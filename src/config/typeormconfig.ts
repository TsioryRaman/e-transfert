import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { entities } from "src/entity/entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT,10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities,
    synchronize: true
  }