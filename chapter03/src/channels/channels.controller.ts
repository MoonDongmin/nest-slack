import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('CHANNEL')
@Controller("api/workspaces/:url/channels")
export class ChannelsController {
    @Get()
    getAllChannels() {

    }

    @Post(":name")
    createChannel() {

    }

    @Get(":name/chats")
    getSpecificChannel(@Query() query, @Param() param) {
        console.log(query.perPage, query.page);
        console.log(param.id, param.url);
    }

    @Post(":name/chats")
    postChat(@Body() body) {

    }

    @Get(":name/members")
    getAllMembers() {

    }

    @Post(":name/members")
    inviteMembers(@Body() body) {

    }
}
