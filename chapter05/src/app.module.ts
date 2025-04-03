import {
    MiddlewareConsumer,
    Module,
    NestModule,
}                         from "@nestjs/common";
import {
    ConfigModule,
    ConfigService,
}                         from "@nestjs/config";
import {AppController}    from "@/app.controller";
import {AppService}       from "@/app.service";
import {LoggerMiddleware} from "@/middlewares/logger.middleware";
import {UsersModule}      from "@/users/users.module";
import {ChannelsModule}   from "@/channels/channels.module";
import {DmsModule}        from "@/dms/dms.module";
import {WorkspacesModule} from "@/workspaces/workspaces.module";
import {TypeOrmModule}    from "@nestjs/typeorm";
import * as process       from "node:process";
import {Users}            from "@/entities/Users";
import {ChannelChats}     from "@/entities/ChannelChats";
import {ChannelMembers}   from "@/entities/ChannelMembers";
import {Channels}         from "@/entities/Channels";
import {DMs}              from "@/entities/DMs";
import {Mentions}         from "@/entities/Mentions";
import {WorkspaceMembers} from "@/entities/WorkspaceMembers";
import { EventsModule } from './events/events.module';
import {Workspaces}       from "@/entities/Workspaces";
import {AuthModule}       from "@/auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        UsersModule,
        ChannelsModule,
        DmsModule,
        WorkspacesModule,
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [
                ChannelChats,
                ChannelMembers,
                Channels,
                DMs,
                Mentions,
                Users,
                WorkspaceMembers,
                Workspaces,
            ],
            // 우리 DB에서 이걸 entities를 가져올 때 이 속성을 추가
            // DB에 entities를 넣고 나면 다시 false로 바꿈
            synchronize: false,
            logging: true,
            charset: "utf8mb4",
        }),
        TypeOrmModule.forFeature([Users]),
        EventsModule,
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
        ConfigService,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
