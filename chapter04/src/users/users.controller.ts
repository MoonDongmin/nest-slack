import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import {JoinRequestDto}             from "@/users/dto/join.request.dto";
import {UsersService}               from "@/users/users.service";
import {
    ApiCookieAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import {UserDto}                    from "@/common/dto/user.dto";
import {User}                       from "@/common/decorators/user.decorator";
import {UndefinedToNullInterceptor} from "@/common/interceptors/undefinedToNull.interceptor";
import {LocalAuthGuard}             from "@/auth/local-auth.guard";
import {LoggedInGuard}              from "@/auth/logged-in.guard";
import {NotLoggedInGuard}           from "@/auth/not-logged-in.guard";
import {Users} from "@/entities/Users";

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags("USER")
@Controller("api/users")
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {
    }

    @ApiCookieAuth('connect.sid')
    @ApiOperation({ summary: '내 정보 가져오기' })
    @Get()
    async getProfile(@User() user: Users) {
        return user || false;
    }

    @ApiOperation({ summary: '로그인' })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: Users) {
        return user;
    }

    @ApiOperation({ summary: '회원가입' })
    @UseGuards(NotLoggedInGuard)
    @Post()
    async join(@Body() data: JoinRequestDto) {
        const result = await this.usersService.join(
            data.email,
            data.nickname,
            data.password,
        );
        if (result) {
            return 'ok';
        } else {
            throw new ForbiddenException();
        }
    }

    @ApiCookieAuth('connect.sid')
    @ApiOperation({ summary: '로그아웃' })
    @UseGuards(LoggedInGuard)
    @Post('logout')
    async logout(@Req() res) {
        res.clearCookie('connect.sid', { httpOnly: true });
        return res.send('ok');
    }
}
