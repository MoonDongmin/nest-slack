import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
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
        return user;
    }

    @ApiOperation({summary: "회원가입"})
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
    @Post("login")
    logIn(@User() user) {
        return user;
    }

    @ApiOperation({summary: "로그아웃"})
    @Post("logout")
    logOut(@Req() req, @Res() res) {
        req.logOut();
        res.clearCookie("connect.sid", {httpOnly: true});
        res.send("ok");
    }
}
