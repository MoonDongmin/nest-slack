import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import {
    map,
    Observable,
} from "rxjs";

// 인터셉터는 마지막에 데이터를 한 번 더 가공해 주는 역할 느낌
@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        // 전 부분
        return next
            .handle()
            .pipe(
            map((data) => data === undefined ? null : data),
        );
        // 후 부분
    }

}

// 이렇게 되면 return user만 해도 자동으로 {data: ___, code: "SUCCESS"} 이렇게 전송이 됨
