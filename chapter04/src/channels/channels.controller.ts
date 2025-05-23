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
    ApiTags,
}                         from "@nestjs/swagger";
import {LoggedInGuard}    from "@/auth/logged-in.guard";
import {ChannelsService}  from "@/channels/channels.service";
import {User}             from "@/common/decorators/user.decorator";
import {Users}            from "@/entities/Users";
import {CreateChannelDto} from "@/channels/dto/post-chat.dto";

@ApiTags("CHANNELS")
@ApiCookieAuth("connect.sid")
@UseGuards(LoggedInGuard)
@Controller("api/workspaces/:url/channels")
export class ChannelsController {
    constructor(private channelsService: ChannelsService) {
    }

    @ApiOperation({summary: "워크스페이스 채널 모두 가져오기"})
    @Get(":url/channels")
    async getWorkspaceChannels({
                                   url,
                                   user,
                               }: { url: any, user: Users }) {
        return this.channelsService.getWorkspaceChannels(url, user.id);
    }

    @ApiOperation({summary: "워크스페이스 특정 채널 가져오기"})
    @Get(":url/channels/:name")
    async getWorkspaceChannel(@Param("url") url, @Param("name") name) {
        return this.channelsService.getWorkspaceChannel(url, name);
    }

    @ApiOperation({summary: "워크스페이스 채널 만들기"})
    @Post(":url/channels")
    async createWorkspaceChannels(
        @Param("url") url,
        @Body() body: CreateChannelDto,
        @User() user: Users,
    ) {
        return this.channelsService.createWorkspaceChannels(
            url,
            body.name,
            user.id,
        );
    }

    @ApiOperation({summary: "워크스페이스 채널 멤버 가져오기"})
    @Get(":url/channels/:name/members")
    async getWorkspaceChannelMembers(
        @Param("url") url: string,
        @Param("name") name: string,
    ) {
        return this.channelsService.getWorkspaceChannelMembers(url, name);
    }

    @ApiOperation({summary: "워크스페이스 채널 멤버 초대하기"})
    @Post(":url/channels/:name/members")
    async createWorkspaceMembers(
        @Param("url") url: string,
        @Param("name") name: string,
        @Body("email") email,
    ) {
        return this.channelsService.createWorkspaceChannelMembers(url, name, email);
    }

    @ApiOperation({summary: "워크스페이스 특정 채널 채팅 모두 가져오기"})
    @Get(":url/channels/:name/chats")
    async getWorkspaceChannelChats(
        @Param("url") url,
        @Param("name") name,
        @Query("perPage", ParseIntPipe) perPage: number,
        @Query("page", ParseIntPipe) page: number,
    ) {
        return this.channelsService.getWorkspaceChannelChats(
            url,
            name,
            perPage,
            page,
        );
    }

    @ApiOperation({summary: "워크스페이스 특정 채널 채팅 생성하기"})
    @Post(":url/channels/:name/chats")
    async createWorkspaceChannelChats(
        @Param("url") url,
        @Param("name") name,
        @Body("content") content,
        @User() user: Users,
    ) {
    }


    @ApiOperation({summary: "안 읽은 개수 가져오기"})
    @Get(":url/channels/:name/unreads")
    async getUnreads(
        @Param("url") url,
        @Param("name") name,
        @Query("after", ParseIntPipe) after: number,
    ) {
        return this.channelsService.getChannelUnreadsCount(url, name, after);
    }
}
