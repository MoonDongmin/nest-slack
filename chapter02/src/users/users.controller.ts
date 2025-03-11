import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
}                       from "@nestjs/common";
import {JoinRequestDto} from "@users/dto/join.request.dto";
import {UsersService}   from "@users/users.service";

@Controller("api/users")
export class UsersController {
    constructor(
        private readonly userService: UsersService,
    ) {
    }

    @Get()
    getUsers(@Req() req) {
        return req.user;
    }

    @Post()
    postUsers(@Body() data: JoinRequestDto) {
        this.userService.postUsers(data.email, data.nickname, data.password);
    }

    @Post("login")
    logIn(@Req() req) {
        return req.user;
    }

    @Post("logout")
    logOut(@Req() req, @Res() res) {
        req.logOut();
        res.clearCookie("connect.sid", {httpOnly: true});
        res.send("ok");
    }
}
