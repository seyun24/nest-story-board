import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Board} from "../boards/board.entity";

export const typeORMcConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'aa192837',
    database: 'board-app',
    // entities: [Board],
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true
}