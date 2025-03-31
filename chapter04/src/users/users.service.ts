import {
    Injectable,
    UnauthorizedException,
}                         from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Users}            from "@/entities/Users";
import {
    DataSource,
    Repository,
}                         from "typeorm";
import bcrypt             from "bcrypt";
import {WorkspaceMembers} from "@/entities/WorkspaceMembers";
import {ChannelMembers}   from "@/entities/ChannelMembers";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(WorkspaceMembers)
        private workspaceMembersRepository: Repository<WorkspaceMembers>,
        @InjectRepository(ChannelMembers)
        private channelMembersRepository: Repository<ChannelMembers>,
        private dataSource: DataSource,
    ) {
    }

    async join(email: string, nickname: string, password: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        // queryRunner로 이를 불러올 때는 manager.getRepository("")이런식으로 불러와야 함
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await queryRunner.manager
            .getRepository(Users)
            .findOne({where: {email}});


        try {
            if (user) {
                throw new UnauthorizedException("이미 존재하는 사용자 입니다.");
            }

            const returned = await queryRunner.manager
                .getRepository(Users)
                .save({
                    email,
                    nickname,
                    password: hashedPassword,
                });


            const workspaceMember = await queryRunner.manager
                .getRepository(WorkspaceMembers)
                .create();
            workspaceMember.UserId = returned.id;
            workspaceMember.WorkspaceId = 1;

            await queryRunner.manager
                .getRepository(WorkspaceMembers)
                .save(workspaceMember);

            await queryRunner.manager
                .getRepository(ChannelMembers)
                .save({
                    UserId: returned.id,
                    ChannelId: 1,
                });

            await queryRunner.commitTransaction();
            return true;
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
