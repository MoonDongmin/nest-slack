import {Injectable}       from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Users}            from "@/entities/Users";
import {
    DataSource,
    Repository,
}                         from "typeorm";
import {WorkspaceMembers} from "@/entities/WorkspaceMembers";
import {ChannelMembers}   from "@/entities/ChannelMembers";
import {Workspaces}       from "@/entities/Workspaces";
import {Channels}         from "@/entities/Channels";

@Injectable()
export class WorkspacesService {
    constructor(
        @InjectRepository(Workspaces)
        private workspacesRepository: Repository<Workspaces>,
        @InjectRepository(Channels)
        private channelsRepository: Repository<Channels>,
        @InjectRepository(WorkspaceMembers)
        private workspaceMembersRepository: Repository<WorkspaceMembers>,
        @InjectRepository(ChannelMembers)
        private channelMembersRepository: Repository<ChannelMembers>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {
    }

    async findById(id: number) {
        return this.workspacesRepository.findOne({
            where: {id},
        });
    }

    async findMyWorkspaces(myId: number) {
        return this.workspacesRepository.find({
            where: {
                WorkspaceMembers: [{UserId: myId}],
            },
        });
    }

    async createWorkspace(name: string, url: string, myId: number) {
    }
}
