import {Injectable}         from "@nestjs/common";
import {PassportSerializer} from "@nestjs/passport";
import {AuthService}        from "@/auth/auth.service";
import {InjectRepository}   from "@nestjs/typeorm";
import {Users}              from "@/entities/Users";
import {Repository}         from "typeorm";

@Injectable()
export class LocalSerializer extends PassportSerializer {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(Users) private userRepository: Repository<Users>,
    ) {
        super();
    }

    serializeUser(user: any, done: CallableFunction): any {
        done(null, user.id);
    }

    async deserializeUser(userId: string, done: CallableFunction) {
        return await this.userRepository
            .findOneOrFail({
                where: {id: +userId},
                select: ["id", "email", "nickname"],
                relations: ["Workspaces"],
            });
    }
}
