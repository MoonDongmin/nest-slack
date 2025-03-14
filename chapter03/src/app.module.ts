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

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UsersModule,
        ChannelsModule,
        DmsModule,
        WorkspacesModule,
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
