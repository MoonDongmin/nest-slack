import {Module}             from "@nestjs/common";
import {ChannelsService}    from "./channels.service";
import {ChannelsController} from "./channels.controller";
import {TypeOrmModule}      from "@nestjs/typeorm";
import {Workspaces}         from "@/entities/Workspaces";
import {WorkspaceMembers}   from "@/entities/WorkspaceMembers";
import {Channels}           from "@/entities/Channels";
import {ChannelMembers}     from "@/entities/ChannelMembers";
import {Users}              from "@/entities/Users";

@Module({
    imports: [TypeOrmModule.forFeature([
        Workspaces,
        WorkspaceMembers,
        Channels,
        ChannelMembers,
        Users,
    ])],
    providers: [ChannelsService],
    controllers: [ChannelsController],
})
export class ChannelsModule {
}
