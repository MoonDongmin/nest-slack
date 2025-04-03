import {Module}             from "@nestjs/common";
import {ChannelsService}    from "./channels.service";
import {ChannelsController} from "./channels.controller";
import {TypeOrmModule}      from "@nestjs/typeorm";
import {Workspaces}         from "@/entities/Workspaces";
import {Channels}           from "@/entities/Channels";
import {ChannelMembers}     from "@/entities/ChannelMembers";
import {Users}              from "@/entities/Users";
import {ChannelChats}       from "@/entities/ChannelChats";
import {EventsModule}       from "@/events/events.module";

@Module({
    imports: [TypeOrmModule.forFeature([
        Channels,
        ChannelChats,
        Users,
        Workspaces,
        ChannelMembers,
    ]),
        EventsModule,

    ],
    providers: [ChannelsService],
    controllers: [ChannelsController],
})
export class ChannelsModule {
}
