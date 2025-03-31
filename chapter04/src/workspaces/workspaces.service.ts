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
        const workspace = this.workspacesRepository.create({
            name,
            url,
            OwnerId: myId,
        });
        const returned = await this.workspacesRepository.save(workspace);

        const workspaceMember = new WorkspaceMembers();
        workspaceMember.UserId = myId;
        workspaceMember.WorkspaceId = returned.id;
        await this.workspaceMembersRepository.save(workspaceMember);

        const channel = new Channels();
        channel.name = "일반";
        channel.WorkspaceId = returned.id;

        const channelReturned = await this.channelsRepository.save(channel);

        const channelMember = new ChannelMembers();
        channelMember.UserId = myId;
        channelMember.ChannelId = channelReturned.id;
        await this.channelMembersRepository.save(channelMember);
    }

    // QueryBuilder
    async getWorkspaceMembers(url: string) {
        return this.usersRepository
            .createQueryBuilder("user")
            .innerJoin("user.Workspace", "workspace")
            .innerJoin("members.Workspace", "workspace", "workspace.url = :url", {url: url})
            .getMany();
    }
}
