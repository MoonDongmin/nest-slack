import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
} from "@nestjs/common";
import {
    ApiParam,
    ApiQuery,
    ApiTags,
} from "@nestjs/swagger";

@ApiTags("DM")
@Controller("api/workspace/:url/dms")
export class DmsController {
    @ApiParam({
        name: "url",
        required: true,
        description: "한 번에 가져오는 개수",
    })
    @ApiQuery({
        name: "perPage",
        required: true,
        description: "한 번에 가져오는 개수",
    })
    @ApiQuery({
        name: "page",
        required: true,
        description: "불러올 페이지",
    })
    @Get(":id/chats")
    // 이렇게도 사용가능함
    // getChat(@Query("perPage") perPage, @Query("page") page, @Param("id") id) {
    //     console.log(perPage, page);
    //     console.log(id);
    // }
    getChat(@Query() query, @Param() param) {
        console.log(query.perPage, query.page);
        console.log(param.id, param.url);
    }

    @Post(":id/chats")
    postChat(@Body() body) {

    }
}
