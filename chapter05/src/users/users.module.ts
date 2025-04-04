import {Module}           from "@nestjs/common";
import {UsersService}     from "@/users/users.service";
import {UsersController}  from "@/users/users.controller";
import {TypeOrmModule}    from "@nestjs/typeorm";
import {Users}            from "@/entities/Users";
import {WorkspaceMembers} from "@/entities/WorkspaceMembers";
import {ChannelMembers}   from "@/entities/ChannelMembers";

@Module({
    imports: [TypeOrmModule.forFeature([Users, WorkspaceMembers, ChannelMembers])],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {
}
