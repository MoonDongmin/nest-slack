import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
}                         from "@nestjs/common";
import {
    ApiCookieAuth,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
}                         from "@nestjs/swagger";
import * as fs            from "node:fs";
import {LoggedInGuard}    from "@/auth/logged-in.guard";
import {Users}            from "@/entities/Users";
import {User}             from "@/common/decorators/user.decorator";
import {FilesInterceptor} from "@nestjs/platform-express";
import {DMsService}       from "@/dms/dms.service";

try {
    fs.readdirSync("uploads");
} catch (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync("uploads");
}

@ApiTags("DMS")
@ApiCookieAuth("connect.sid")
@UseGuards(LoggedInGuard)
@Controller("api/workspaces")
export class DMsController {
    constructor(private dmsService: DMsService) {
    }

    @ApiOperation({summary: "워크스페이스 DM 모두 가져오기"})
    @Get(":url/dms")
    async getWorkspaceChannels(@Param("url") url, @User() user: Users) {
    }

    @ApiOperation({summary: "워크스페이스 특정 DM 채팅 모두 가져오기"})
    @Get(":url/dms/:id/chats")
    async getWorkspaceDMChats(
        @Param("url") url,
        @Param("id", ParseIntPipe) id: number,
        @Query("perPage", ParseIntPipe) perPage: number,
        @Query("page", ParseIntPipe) page: number,
        @User() user: Users,
    ) {
    }

    @ApiOperation({summary: "워크스페이스 특정 DM 채팅 생성하기"})
    @Post(":url/dms/:id/chats")
    async createWorkspaceDMChats(
        @Param("url") url,
        @Param("id", ParseIntPipe) id: number,
        @Body("content") content,
        @User() user: Users,
    ) {
    }

    @ApiOperation({summary: "워크스페이스 특정 DM 이미지 업로드하기"})
    @Post(":url/dms/:id/images")
    async createWorkspaceDMImages() {

    }

    @ApiOperation({summary: "안 읽은 개수 가져오기"})
    @Get(":url/dms/:id/unreads")
    async getUnreads(
        @Param("url") url,
        @Param("id", ParseIntPipe) id: number,
        @Query("after", ParseIntPipe) after: number,
        @User() user: Users,
    ) {
    }
}
