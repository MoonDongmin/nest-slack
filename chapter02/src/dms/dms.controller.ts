import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
} from "@nestjs/common";

@Controller("api/workspace/:url/dms")
export class DmsController {
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
