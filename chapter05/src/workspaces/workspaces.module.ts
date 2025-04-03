import {Module}               from "@nestjs/common";
import {WorkspacesController} from "./workspaces.controller";
import {WorkspacesService}    from "./workspaces.service";
import {TypeOrmModule}        from "@nestjs/typeorm";
import {Workspaces}           from "@/entities/Workspaces";
import {WorkspaceMembers}     from "@/entities/WorkspaceMembers";
import {Channels}             from "@/entities/Channels";
import {ChannelMembers}       from "@/entities/ChannelMembers";
import {Users}                from "@/entities/Users";

@Module({
    imports: [TypeOrmModule.forFeature([
        Workspaces,
        WorkspaceMembers,
        Channels,
        ChannelMembers,
        Users,
    ])],
    controllers: [WorkspacesController],
    providers: [WorkspacesService],
})
export class WorkspacesModule {
}
