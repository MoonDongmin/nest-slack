import {
    MiddlewareConsumer,
    Module,
    NestModule,
}                         from "@nestjs/common";
import {
    ConfigModule,
    ConfigService,
}                         from "@nestjs/config";
import {AppController}    from "./app.controller";
import {AppService}       from "./app.service";
import {LoggerMiddleware} from "./middlewares/logger.middleware";

// const getEnv = async () => {
//     const response = await axios.get("/비밀키요청");
//     return response.data;
// };

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            // load: [getEnv],
        })],
    controllers: [AppController],
    providers: [
        // 이게 원형임
        // {
        //     provide: AppService,
        //     useClass: AppService,
        // },
        {
            provide: "CUSTOM_KEY",
            useValue: "CUSTOM",
        },
        AppService,
        ConfigService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
