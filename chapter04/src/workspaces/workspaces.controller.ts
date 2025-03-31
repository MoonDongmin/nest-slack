import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
}                           from "@nestjs/common";
import {ApiTags}            from "@nestjs/swagger";
import {WorkspacesService}  from "@/workspaces/workspaces.service";
import {User}               from "@/common/decorators/user.decorator";
import {Users}              from "@/entities/Users";
import {CreateWorkspaceDto} from "@/workspaces/dto/create-workspace.dto";

@ApiTags("WORKSPACE")
@Controller("api/workspaces")
export class WorkspacesController {
    constructor(
        private workspacesService: WorkspacesService,
    ) {
    }

    @Get("/:myId")
    // ParseIntPipe를 사용해서 string값을 알아서 number로 바꿔줌
    getMyWorkspaces(@User() user: Users) {
        return this.workspacesService.findMyWorkspaces(user.id);
    }

    @Post()
    createWorkspace(@User() user: Users, @Body() body: CreateWorkspaceDto) {
        return this.workspacesService.createWorkspace(body.workspace, body.url, user.id);
    }

    @Get(":url/members")
    getAllMembersFromWorkspace() {

    }

    @Get(":url/members")
    inviteMembersToWorkspace() {

    }

    @Delete(":url/members")
    kickMemberFromWorkspace() {

    }

    @Get(":url/members/:id")
    getMemberInfoInWorkspace() {

    }

    @Get(":url/users/:id")
    DEPRECATED_getMemberInfoInWorkspace() {

    }
}
