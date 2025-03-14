import {
    createParamDecorator,
    ExecutionContext,
} from "@nestjs/common";

// @Req() req 부분을 데코레이터를 사용해서 @User() user 이런식으로 만든 것
export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
