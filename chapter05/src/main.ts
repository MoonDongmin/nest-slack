import {NestFactory}            from "@nestjs/core";
import {AppModule}              from "@/app.module";
import * as process             from "node:process";
import {
    DocumentBuilder,
    SwaggerModule,
}                               from "@nestjs/swagger";
import cookieParser             from "cookie-parser";
import session                  from "express-session";
import {HttpExceptionFilter}    from "@/httpException.filter";
import {ValidationPipe}         from "@nestjs/common";
import passport                 from "passport";
import path                     from "path";
import {NestExpressApplication} from "@nestjs/platform-express";


declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const port = process.env.PORT || 3000;
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    const config = new DocumentBuilder()
        .setTitle("Sleact API")
        .setDescription("Sleact 개발을 위한 API 문서입니다.")
        .setVersion("1.0")
        .addCookieAuth("connect.sid")
        .build();

    app.enableCors({
        origin: true,
        credentials: true,
    });

    app.useStaticAssets(path.join(__dirname, "..", "uploads"), {
        prefix: "/uploads",
    });

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
    app.use(cookieParser());
    app.use(
        session({
            resave: false,
            saveUninitialized: false,
            secret: process.env.COOKIE_SECRET,
            cookie: {
                httpOnly: true,
            },
        }),
    );
    // passport를 쓰려면 이렇게 등록해야 함
    app.use(passport.initialize());
    app.use(passport.session());


    await app.listen(port);
    console.log(`listening on port ${port}`);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
