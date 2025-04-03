import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
}                 from "@nestjs/common";
import {Response} from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const err = exception.getResponse() as
            | { message: any, statusCode: number }
            | { error: string, statusCode: 400, message: string[] }; // class-validator가 이런식으로 메시지를 줌

        if (typeof err !== "string" && err.statusCode === 400) {
            return response.status(status).json({
                success: false,
                code: status,
                data: err.message,
            });
        }

        response.status(status).json({
            success: false,
            code: status,
            data: err.message,
        });

    }
}
