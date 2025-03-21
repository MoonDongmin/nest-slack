import {
    createParamDecorator,
    ExecutionContext,
} from "@nestjs/common";

// @Token() token 이렇게 사용해서 jwt 토큰을 뽑아 올 수 있게 만든 데코레이터
export const Token = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const response = ctx.switchToHttp().getResponse();
        return response.locals.jwt;
    },
);
