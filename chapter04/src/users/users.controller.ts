import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
}                                   from "@nestjs/common";
import {JoinRequestDto}             from "@/users/dto/join.request.dto";
import {UsersService}               from "@/users/users.service";
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
}                                   from "@nestjs/swagger";
import {UserDto}                    from "@/common/dto/user.dto";
import {User}                       from "@/common/decorators/user.decorator";
import {UndefinedToNullInterceptor} from "@/common/interceptors/undefinedToNull.interceptor";
import {LocalAuthGuard}             from "@/auth/local-auth.guard";
import {LoggedInGuard}              from "@/auth/logged-in.guard";
import {NotLoggedInGuard}           from "@/auth/not-logged-in.guard";

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags("USER")
@Controller("api/users")
export class UsersController {
    constructor(
        private readonly userService: UsersService,
    ) {
    }

    @ApiResponse({
        type: UserDto,
        status: 200,
        description: "성공",
    })
    @ApiOperation({summary: "내 정보 조회"})
    @Get()
    getUsers(@User() user) {
        return user || false;
    }

    @ApiOperation({summary: "회원가입"})
    @UseGuards(new NotLoggedInGuard())
    @Post()
    async join(@Body() data: JoinRequestDto) {
        await this.userService.join(data.email, data.nickname, data.password);
    }


    @ApiResponse({
        type: UserDto,
        status: 200,
        description: "성공",
    })
    @ApiResponse({
        status: 500,
        description: "서버 에러",
    })
    @ApiOperation({summary: "로그인"})
    // Guard: 컨트롤러에 들어가기 전에 권한같은걸 해준다고 보면 됨
    @UseGuards(new LocalAuthGuard())
    @Post("login")
    logIn(@User() user) {
        return user;
    }

    @ApiOperation({summary: "로그아웃"})
    @UseGuards(new LoggedInGuard())
    @Post("logout")
    logOut(@Req() req, @Res() res) {
        req.logOut();
        res.clearCookie("connect.sid", {httpOnly: true});
        res.send("ok");
    }
}
